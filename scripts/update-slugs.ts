import { db as prisma } from '../src/app/_lib/prisma'

function generateSlug(text: string) {
  return text
    .toString()
    .normalize('NFD') // Separa os acentos das letras
    .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífen
    .replace(/[^\w\-]+/g, '') // Remove qualquer caractere que não seja letra, número ou hífen
    .replace(/\-\-+/g, '-') // Remove hífens duplicados
}

async function main() {
  console.log('Buscando projetos no banco de dados...')

  const projects = await prisma.project.findMany({
    include: {
      translations: true,
    },
  })

  if (projects.length === 0) {
    console.log('Nenhum projeto encontrado.')
    return
  }

  for (const project of projects) {
    // Tenta pegar a tradução em PT, se não achar pega a primeira que vier
    const translation =
      project.translations.find((t) => t.locale === 'pt') ||
      project.translations[0]

    if (!translation) {
      console.warn(`Projeto ${project.id} pulado: Nenhuma tradução encontrada.`)
      continue
    }

    const slug = generateSlug(translation.title)

    // Previne erros caso dois projetos tenham exatamente o mesmo título
    let isUnique = false
    let suffix = 1
    let finalSlug = slug

    while (!isUnique) {
      const existing = await prisma.project.findFirst({
        where: { slug: finalSlug },
      })

      // Se não achou outro com esse slug, ou se o que achou é o próprio projeto atual
      if (!existing || existing.id === project.id) {
        isUnique = true
      } else {
        finalSlug = `${slug}-${suffix}`
        suffix++
      }
    }

    await prisma.project.update({
      where: { id: project.id },
      data: { slug: finalSlug },
    })

    console.log(`✅ Projeto atualizado: ${translation.title} -> ${finalSlug}`)
  }

  console.log('Todos os slugs foram gerados com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
