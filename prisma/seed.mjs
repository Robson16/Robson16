import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const experiencesData = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/app/_data/experiences.json'), 'utf-8'))
const projectsData = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/app/_data/projects.json'), 'utf-8'))
const skillsData = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/app/_data/skills.json'), 'utf-8'))

function parseDatePt(dateString) {
  const months = {
    janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5,
    julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11,
  }
  const parts = dateString.toLowerCase().split(' de ')
  if (parts.length === 2) {
    const month = months[parts[0]]
    const year = parseInt(parts[1], 10)
    return new Date(year, month, 1)
  }
  return new Date()
}

async function main() {
  console.log('🌱 Iniciando o Seeding V2 (Múltiplas Imagens e Idiomas Dinâmicos)...')

  // 1. Limpeza em ordem reversa para não quebrar chaves estrangeiras
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

  // 2. Criar Idiomas (O segredo para a migração funcionar!)
  console.log('🗣️ Inserindo Idiomas Base...')
  await prisma.language.createMany({
    data: [
      { code: 'pt', name: 'Português', isDefault: true },
      { code: 'en', name: 'English', isDefault: false },
    ]
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
      links.push({ type: 'LIVE_DEMO', url: proj.url })
    }
    for (const repo of proj.repositories) {
      links.push({
        type: repo.platform.toUpperCase(),
        url: repo.url,
      })
    }

    const createdProject = await prisma.project.create({
      data: {
        tier: proj.featured ? 1 : 3,
        // O campo antigo 'image' saiu, agora criamos a relação com a nova tabela!
        gallery: {
          create: [
            { url: proj.featuredImage.src, order: 0 }
          ]
        },
        links: {
          create: links,
        },
        translations: {
          create: [
            { locale: 'pt', title: proj.heading.pt, description: proj.description.pt },
            { locale: 'en', title: proj.heading.en, description: proj.description.en },
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

  console.log('✅ Seeding V2 finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })