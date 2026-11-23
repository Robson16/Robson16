import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Iniciando o Seeding local...')

  // Limpeza respeitando FKs
  await prisma.experienceProject.deleteMany()
  await prisma.projectSkill.deleteMany()
  await prisma.projectLink.deleteMany()
  await prisma.projectImage.deleteMany()
  await prisma.projectTranslation.deleteMany()
  await prisma.experienceTranslation.deleteMany()
  await prisma.skillTranslation.deleteMany()
  await prisma.educationTranslation.deleteMany()
  await prisma.featureTranslation.deleteMany()
  await prisma.profileTranslation.deleteMany()

  await prisma.project.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.education.deleteMany()
  await prisma.feature.deleteMany()
  await prisma.socialLink.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.language.deleteMany()

  console.log('🗣️ Inserindo Idiomas...')
  await prisma.language.createMany({
    data: [
      { code: 'pt', name: 'Português', isDefault: true },
      { code: 'en', name: 'English', isDefault: false },
    ],
  })

  console.log('👤 Inserindo Profile...')
  await prisma.profile.create({
    data: {
      name: 'Robson Henrique Rodrigues',
      email: 'contato@robsonhrodrigues.com.br',
      phone: '+55 11 98214-5920',
      locationUrl: 'https://maps.google.com/?q=Jundiai,SP,Brazil',
      avatarUrl: '/images/about-image.png',
      translations: {
        create: [
          {
            locale: 'pt',
            title: 'Analista de Sistemas / Desenvolvedor Full Stack',
            locationName: 'Jundiaí - São Paulo / Brasil',
            bio: 'Desenvolvedor Full Stack e Analista de Sistemas focado na modernização e criação de aplicações web escaláveis com React.js, Next.js, Node.js, NestJS e PHP.',
            objective:
              'Em busca de recolocação profissional e novos desafios como Analista de Sistemas / Desenvolvedor Full Stack, com disponibilidade para atuação remota, híbrida ou presencial.',
          },
          {
            locale: 'en',
            title: 'Systems Analyst / Full Stack Developer',
            locationName: 'Jundiaí - São Paulo / Brazil',
            bio: 'Full Stack Developer and Systems Analyst focused on modernizing and building scalable web applications with React.js, Next.js, Node.js, NestJS, and PHP.',
            objective:
              'Seeking new challenges as a Systems Analyst / Full Stack Developer, available for remote, hybrid, or on-site roles.',
          },
        ],
      },
    },
  })

  console.log('🌐 Inserindo Social Links...')
  await prisma.socialLink.createMany({
    data: [
      {
        icon: 'github',
        name: 'GitHub',
        url: 'https://github.com/Robson16',
        order: 1,
      },
      {
        icon: 'gitlab',
        name: 'GitLab',
        url: 'https://gitlab.com/Robson16',
        order: 2,
      },
      {
        icon: 'linkedin',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/robson-h-rodrigues-93341746/',
        order: 3,
      },
    ],
  })

  console.log('✨ Inserindo Features...')
  const features = [
    {
      icon: 'code',
      order: 1,
      pt: {
        title: 'Desenvolvimento Full Stack',
        description:
          'Aplicações web escaláveis com React, Next.js, Node.js e NestJS.',
      },
      en: {
        title: 'Full Stack Development',
        description:
          'Scalable web applications with React, Next.js, Node.js, and NestJS.',
      },
    },
    {
      icon: 'database',
      order: 2,
      pt: {
        title: 'Arquitetura & Dados',
        description:
          'APIs RESTful com Clean Architecture, SOLID, DDD e PostgreSQL.',
      },
      en: {
        title: 'Architecture & Data',
        description:
          'RESTful APIs using Clean Architecture, SOLID, DDD, and PostgreSQL.',
      },
    },
    {
      icon: 'performance',
      order: 3,
      pt: {
        title: 'Infraestrutura & Automação',
        description:
          'Docker, Linux, CI/CD e automação de processos corporativos.',
      },
      en: {
        title: 'Infrastructure & Automation',
        description: 'Docker, Linux, CI/CD, and corporate process automation.',
      },
    },
  ]

  for (const feat of features) {
    await prisma.feature.create({
      data: {
        icon: feat.icon,
        order: feat.order,
        translations: {
          create: [
            { locale: 'pt', ...feat.pt },
            { locale: 'en', ...feat.en },
          ],
        },
      },
    })
  }

  console.log('🎓 Inserindo Education...')
  await prisma.education.create({
    data: {
      startDate: new Date(2024, 6, 1),
      endDate: new Date(2027, 5, 1),
      order: 1,
      translations: {
        create: [
          {
            locale: 'pt',
            title: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
            institution: 'FATEC Jundiaí',
            description:
              'Análise, projeto, documentação, teste, implantação e manutenção de sistemas computacionais.',
          },
          {
            locale: 'en',
            title: 'Associate Degree in Systems Analysis and Development',
            institution: 'FATEC Jundiaí',
            description:
              'Analysis, design, documentation, testing, deployment, and maintenance of software systems.',
          },
        ],
      },
    },
  })

  console.log('🛠️ Inserindo Skills...')
  const skillNames = [
    'TypeScript',
    'React.js',
    'Next.js',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Docker',
    'PHP',
  ]

  const skillMap = new Map()
  for (const name of skillNames) {
    const skill = await prisma.skill.create({
      data: {
        category: 'Technical',
        translations: {
          create: [
            { locale: 'pt', name },
            { locale: 'en', name },
          ],
        },
      },
    })
    skillMap.set(name, skill.id)
  }

  console.log('💼 Inserindo Experiências...')
  const contractorExp = await prisma.experience.create({
    data: {
      company: 'Atuação Autônoma / Projetos',
      startDate: new Date(2024, 0, 1),
      endDate: null,
      translations: {
        create: [
          {
            locale: 'pt',
            role: 'Analista de Sistemas / Desenvolvedor Full Stack (Contractor)',
            description:
              'Prestação de serviços autônomos de desenvolvimento e suporte contínuo.\nDesenvolvimento de arquitetura e projetos full stack utilizando Node.js, NestJS, React e Next.js.',
          },
          {
            locale: 'en',
            role: 'Systems Analyst / Full Stack Developer (Contractor)',
            description:
              'Freelance full stack development and ongoing technical support.\nArchitecture and development using Node.js, NestJS, React, and Next.js.',
          },
        ],
      },
    },
  })

  await prisma.experience.create({
    data: {
      company: 'Siemens Energy',
      startDate: new Date(2026, 1, 1),
      endDate: new Date(2026, 6, 1),
      translations: {
        create: [
          {
            locale: 'pt',
            role: 'Estagiário de Tecnologia (Transformação Digital)',
            description:
              'Automatizei e digitalizei processos operacionais nas áreas de Meio Ambiente e Qualidade.\nDesenvolvi aplicações corporativas low-code utilizando a plataforma Mendix.',
          },
          {
            locale: 'en',
            role: 'Technology Intern (Digital Transformation)',
            description:
              'Automated and digitized operational processes in Environment and Quality departments.\nBuilt corporate low-code applications using Mendix.',
          },
        ],
      },
    },
  })

  console.log('🚀 Inserindo Projetos...')
  const projects = [
    {
      slug: 'robson16-portfolio',
      tier: 1,
      developedAt: new Date(2026, 10, 1),
      image: '/images/code.jpg',
      skills: ['TypeScript', 'Next.js', 'React.js', 'PostgreSQL', 'Docker'],
      links: [
        { type: 'GITHUB', url: 'https://github.com/Robson16/Robson16' },
        { type: 'WEBSITE', url: 'https://robsonhrodrigues.com.br' },
      ],
      pt: {
        title: 'Portfólio Robson16',
        description:
          'Portfólio pessoal com CMS administrativo, i18n e gerador de currículo em PDF ATS-friendly.',
        challenge:
          'Manter portfólio e currículo sincronizados em dois idiomas.',
        solution:
          'Next.js App Router, Prisma, PostgreSQL e @react-pdf/renderer.',
        impact: 'Fonte única de verdade para site e PDF.',
      },
      en: {
        title: 'Robson16 Portfolio',
        description:
          'Personal portfolio with admin CMS, i18n, and ATS-friendly PDF resume generator.',
        challenge: 'Keeping portfolio and resume synced across two languages.',
        solution:
          'Next.js App Router, Prisma, PostgreSQL, and @react-pdf/renderer.',
        impact: 'Single source of truth for web and PDF.',
      },
    },
    {
      slug: 'fast-feet-api',
      tier: 1,
      developedAt: new Date(2026, 9, 1),
      image: '/images/computer.jpg',
      skills: ['TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Docker'],
      links: [
        { type: 'GITHUB', url: 'https://github.com/Robson16/fast-feet-api' },
      ],
      pt: {
        title: 'FastFeet API',
        description:
          'API RESTful de logística construída com NestJS, Clean Architecture e DDD.',
        challenge:
          'Modelar regras de negócio complexas de entregas e permissões.',
        solution: 'NestJS, Prisma, Zod, Swagger e testes unitários/E2E.',
        impact: 'Alta cobertura de testes e código desacoplado.',
      },
      en: {
        title: 'FastFeet API',
        description:
          'Logistics RESTful API built with NestJS, Clean Architecture, and DDD.',
        challenge: 'Modeling complex delivery business rules and RBAC.',
        solution: 'NestJS, Prisma, Zod, Swagger, and unit/E2E tests.',
        impact: 'High test coverage and decoupled architecture.',
      },
    },
  ]

  for (const proj of projects) {
    const created = await prisma.project.create({
      data: {
        slug: proj.slug,
        tier: proj.tier,
        developedAt: proj.developedAt,
        gallery: {
          create: [{ url: proj.image, order: 0 }],
        },
        links: {
          create: proj.links,
        },
        translations: {
          create: [
            { locale: 'pt', ...proj.pt },
            { locale: 'en', ...proj.en },
          ],
        },
      },
    })

    for (const tech of proj.skills) {
      const skillId = skillMap.get(tech)
      if (skillId) {
        await prisma.projectSkill.create({
          data: { projectId: created.id, skillId },
        })
      }
    }

    await prisma.experienceProject.create({
      data: { experienceId: contractorExp.id, projectId: created.id },
    })
  }

  console.log('✅ Seeding local finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
