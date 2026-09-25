import { randomUUID } from 'node:crypto' // Para gerar o ID único da imagem
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3' // Import do S3
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'

// Configurações do Banco
const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Configuração do MinIO/R2 no Seed
const s3Client = new S3Client({
  region: 'us-east-1',
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const experiencesData = JSON.parse(
  fs.readFileSync(
    path.join(rootDir, 'src/app/_data/experiences.json'),
    'utf-8',
  ),
)
const projectsData = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'src/app/_data/projects.json'), 'utf-8'),
)
const skillsData = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'src/app/_data/skills.json'), 'utf-8'),
)

function parseDatePt(dateString) {
  const months = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  }
  const parts = dateString.toLowerCase().split(' de ')
  if (parts.length === 2) {
    const month = months[parts[0]]
    const year = parseInt(parts[1], 10)
    return new Date(year, month, 1)
  }
  return new Date()
}

// Função auxiliar para fazer o upload da imagem local para o MinIO
async function uploadImageToStorage(localPath) {
  try {
    // Ex: transforma "/images/projects/babydufy.jpg" no caminho real da sua máquina
    const fullPath = path.join(rootDir, 'public', localPath)

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ Imagem não encontrada localmente: ${fullPath}`)
      return localPath // Retorna o caminho estático como fallback
    }

    const fileBuffer = fs.readFileSync(fullPath)
    const fileName = path.basename(localPath)

    // Mesma lógica de higienização do nosso StorageService
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '-')
    const uniqueFileName = `${randomUUID()}-${sanitizedName}`

    const ext = path.extname(fileName).toLowerCase()
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg'

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: mimeType,
    })

    await s3Client.send(command)
    console.log(`🖼️ Upload concluído: ${fileName} -> MinIO`)

    return `${process.env.CLOUDFLARE_PUBLIC_URL}/${uniqueFileName}`
  } catch (error) {
    console.error('❌ Erro no upload para o MinIO:', error)
    return localPath
  }
}

async function main() {
  console.log('🌱 Iniciando o Seeding V3 (Upload de Imagens para o MinIO)...')

  await prisma.projectImage.deleteMany()
  await prisma.experienceProject.deleteMany()
  await prisma.projectSkill.deleteMany()
  await prisma.projectTranslation.deleteMany()
  await prisma.experienceTranslation.deleteMany()
  await prisma.skillTranslation.deleteMany()
  await prisma.project.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.language.deleteMany()

  console.log('🗣️ Inserindo Idiomas Base...')
  await prisma.language.createMany({
    data: [
      { code: 'pt', name: 'Português', isDefault: true },
      { code: 'en', name: 'English', isDefault: false },
    ],
  })

  const skillMap = new Map()

  console.log('🛠️ Inserindo Skills...')
  for (const skill of skillsData.technical) {
    const created = await prisma.skill.create({
      data: {
        category: 'Technical',
        translations: {
          create: [
            { locale: 'pt', name: skill.name },
            { locale: 'en', name: skill.name },
          ],
        },
      },
    })
    skillMap.set(skill.name, created.id)
  }

  for (const skill of skillsData.professional) {
    const created = await prisma.skill.create({
      data: {
        category: 'Professional',
        translations: {
          create: [
            { locale: 'pt', name: skill.name.pt },
            { locale: 'en', name: skill.name.en },
          ],
        },
      },
    })
    skillMap.set(skill.name.pt, created.id)
  }

  console.log('💼 Inserindo Experiências...')
  for (const exp of experiencesData.experiences) {
    await prisma.experience.create({
      data: {
        company: exp.company,
        startDate: parseDatePt(exp.period.start.pt),
        endDate: exp.period.end ? parseDatePt(exp.period.end.pt) : null,
        translations: {
          create: [
            {
              locale: 'pt',
              role: exp.title.pt,
              description: exp.responsibilities.pt.join('\n'),
            },
            {
              locale: 'en',
              role: exp.title.en,
              description: exp.responsibilities.en.join('\n'),
            },
          ],
        },
      },
    })
  }

  console.log('🚀 Inserindo Projetos e construindo a Galeria...')
  for (const proj of projectsData.projects) {
    const links = []
    if (proj.url) {
      links.push({ type: 'Website', url: proj.url })
    }
    for (const repo of proj.repositories) {
      links.push({
        type: repo.platform.toUpperCase(),
        url: repo.url,
      })
    }

    // 🔥 O PULO DO GATO: Faz o upload da imagem antes de salvar no banco!
    const finalImageUrl = await uploadImageToStorage(proj.featuredImage.src)

    const createdProject = await prisma.project.create({
      data: {
        tier: proj.featured ? 1 : 3,
        gallery: {
          create: [{ url: finalImageUrl, order: 0 }],
        },
        links: {
          create: links,
        },
        translations: {
          create: [
            {
              locale: 'pt',
              title: proj.heading.pt,
              description: proj.description.pt,
            },
            {
              locale: 'en',
              title: proj.heading.en,
              description: proj.description.en,
            },
          ],
        },
      },
    })

    // Associações de Skills
    for (const techName of proj.technologies) {
      let skillId = skillMap.get(techName)

      if (!skillId) {
        const newSkill = await prisma.skill.create({
          data: {
            category: 'Technical',
            translations: {
              create: [
                { locale: 'pt', name: techName },
                { locale: 'en', name: techName },
              ],
            },
          },
        })
        skillId = newSkill.id
        skillMap.set(techName, skillId)
      }

      await prisma.projectSkill.create({
        data: {
          projectId: createdProject.id,
          skillId: skillId,
        },
      })
    }
  }

  console.log('✅ Seeding V3 finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
