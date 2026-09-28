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

// Adicione isso no topo, junto com os outros JSON.parse
const contactsData = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'src/app/_data/contacts.json'), 'utf-8'),
)
const educationData = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'src/app/_data/education.json'), 'utf-8'),
)
const featuresData = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'src/app/_data/features.json'), 'utf-8'),
)
const socialData = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'src/app/_data/social.json'), 'utf-8'),
)
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
async function uploadImageToStorage(localPath, keepOriginalName = false) {
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
    // Se keepOriginalName for true, ele usa um prefixo fixo de 'seed-' em vez de UUID aleatório
    const finalFileName = keepOriginalName
      ? `seed-${sanitizedName}`
      : `${randomUUID()}-${sanitizedName}`

    const ext = path.extname(fileName).toLowerCase()
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg'

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: finalFileName,
      Body: fileBuffer,
      ContentType: mimeType,
    })

    await s3Client.send(command)
    console.log(`🖼️ Upload concluído: ${fileName} -> MinIO (${finalFileName})`)

    return `${process.env.CLOUDFLARE_PUBLIC_URL}/${finalFileName}`
  } catch (error) {
    console.error('❌ Erro no upload para o MinIO:', error)
    return localPath
  }
}

async function main() {
  console.log('🌱 Iniciando o Seeding V3 (Upload de Imagens para o MinIO)...')

  await prisma.profileTranslation.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.socialLink.deleteMany()
  await prisma.featureTranslation.deleteMany()
  await prisma.feature.deleteMany()
  await prisma.educationTranslation.deleteMany()
  await prisma.education.deleteMany()
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

  console.log('👤 Inserindo Profile (Settings)...')

  const avatarUrl = await uploadImageToStorage('/images/profile.jpg', true)

  await prisma.profile.create({
    data: {
      email: contactsData.email,
      phone: contactsData.phone,
      locationUrl: contactsData.location.url,
      avatarUrl: avatarUrl,
      translations: {
        create: [
          {
            locale: 'pt',
            locationName: contactsData.location.name.pt,
            bio: 'Desenvolvedor Full Stack apaixonado por criar soluções eficientes e escaláveis.',
          },
          {
            locale: 'en',
            locationName: contactsData.location.name.en,
            bio: 'Full Stack Developer passionate about creating efficient and scalable solutions.',
          },
        ],
      },
    },
  })

  console.log('🌐 Inserindo Social Links...')
  const socialLinks = [
    { name: socialData.github.name, url: socialData.github.url, order: 1 },
    { name: socialData.gitlab.name, url: socialData.gitlab.url, order: 2 },
    { name: socialData.linkedin.name, url: socialData.linkedin.url, order: 3 },
  ]
  for (const link of socialLinks) {
    await prisma.socialLink.create({ data: link })
  }

  console.log('✨ Inserindo Features...')
  for (const feature of featuresData.features) {
    await prisma.feature.create({
      data: {
        icon: feature.icon,
        order: feature.id,
        translations: {
          create: [
            {
              locale: 'pt',
              title: feature.title.pt,
              description: feature.description.pt,
            },
            {
              locale: 'en',
              title: feature.title.en,
              description: feature.description.en,
            },
          ],
        },
      },
    })
  }

  console.log('🎓 Inserindo Education...')
  for (const edu of educationData.education) {
    await prisma.education.create({
      data: {
        startDate: parseDatePt(edu.period.start.pt),
        endDate:
          edu.period.end.pt.toLowerCase() === 'atualmente'
            ? null
            : parseDatePt(edu.period.end.pt),
        order: edu.id,
        translations: {
          create: [
            {
              locale: 'pt',
              title: edu.title.pt,
              institution: edu.institution.pt,
              description: edu.description.pt,
            },
            {
              locale: 'en',
              title: edu.title.en,
              institution: edu.institution.en,
              description: edu.description.en,
            },
          ],
        },
      },
    })
  }

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
