# Backlog do Portfólio (Robson16)

## Epic 1: Tooling, Modernização e Arquitetura Inicial

### Story 1.1: Atualização de Dependências e Motores

- [x] Atualizar engine no `package.json` para Node.js >= 24.
- [x] Atualizar todas as dependências (`dependencies` e `devDependencies`) para as versões mais recentes via `npm-check-updates`.
- [x] Configurar pacote de versionamento semântico automático (`commit-and-tag-version`).

### Story 1.2: Linters e Qualidade de Código

- [x] Revisar e validar o ESLint (Flat Config) e Prettier (`@rocketseat/eslint-config`).
- [x] Garantir que o comando `npm run lint` esteja passando sem erros ou avisos (warnings).
- [x] Garantir que o comando `npm run build` conclua com sucesso (sem falhas de tipagem ou exportação).

### Story 1.3: Limpeza de Dependências e Bibliotecas de UI

- [x] Revisar o uso do HeroUI (antigo NextUI) e remover componentes instalados mas não utilizados.
- [x] Analisar a necessidade do `react-slick` / `slick-carousel` vs bibliotecas mais modernas ou CSS puro.
- [x] Remover pacotes órfãos ou redundantes no `package.json`.

### Story 1.4: Padronização de Componentes

- [x] Padronizar a estrutura de pastas entre `components` e `containers`.
- [x] Garantir o uso correto de `'use client'` apenas onde for estritamente necessário (Framer Motion, eventos de clique, estado local).

### Story 1.5: Internacionalização (i18n)

- [x] Revisar a implementação do `next-intl` para o Next.js 15 (App Router).
- [x] Garantir que o roteamento de locale (`[locale]`) esteja devidamente otimizado para SEO e performance.

### Story 1.6: UI, Temas e Acessibilidade

- [x] Validar suporte a temas (Dark/Light mode) usando `next-themes`.
- [x] Revisar animações do `framer-motion` para não impactar o LCP (Largest Contentful Paint).
- [x] Validar acessibilidade e semântica (tags ARIA, navegação por teclado nos componentes interativos).

---

## Epic 2: Reposicionamento e Nova Arquitetura de Dados ("Show, Don't Tell")

### Story 2.1: Reestruturação da Base de Projetos

- [x] Implementar sistema de "Tiers" (níveis de destaque) no JSON.
- [x] Limpar e reorganizar projetos antigos em uma visualização secundária (Grid/Tabela de Arquivo).

### Story 2.2: Refatoração de Habilidades e Experiências

- [x] Remover o sistema de barras de porcentagem/progresso das tecnologias.
- [x] Vincular as tecnologias (Skills) diretamente aos Projetos em que foram utilizadas.

---

## Epic 3: Desenvolvimento de Features Visuais e Integrações (APIs Externas)

### Story 3.1: Mosaico de Contribuições (Hero Section)

- [ ] Instalar e configurar a biblioteca `react-activity-calendar`.
- [ ] Desenvolver serviço de fetch para consumir a API GraphQL do GitHub (`contributionsCollection`).
- [ ] Desenvolver serviço de fetch para consumir a API de Eventos do GitLab.
- [ ] Criar função utilitária para mesclar e somar as arrays de contribuições (GitHub + GitLab) por data e renderizar no gráfico customizado.

### Story 3.2: Páginas Internas de Detalhes dos Projetos

- [ ] Criar a rota dinâmica de visualização de projeto (`src/app/[locale]/portfolio/[projectId]/page.tsx`).
- [ ] Desenvolver o layout focado em "Estudo de Caso", exibindo o Desafio, a Solução Arquitetural, e as Métricas de Impacto.
- [ ] Configurar os links para repositórios (Front/Back) e deploy (Swagger, Vercel, Render).

### Story 3.3: Timeline de Histórico de Commits

- [ ] Criar o componente `<CommitTimeline repoUrl="..." />`.
- [ ] Configurar consumo dinâmico da API REST do GitHub (`/repos/{owner}/{repo}/commits`).
- [ ] Configurar consumo dinâmico da API REST do GitLab (`/projects/{id}/repository/commits`).
- [ ] Renderizar na página de detalhes de cada projeto os últimos commits de forma animada, provando aderência ao padrão _Conventional Commits_.

## Epic 4: Migração de Dados para PostgreSQL (Vercel Postgres)

### Story 4.1: Configuração do Prisma e Banco de Dados

- [x] Instalar o Prisma CLI (`devDependencies`) e o Prisma Client (`dependencies`).
- [x] Inicializar o Prisma (`npx prisma init`) e configurar as variáveis `DATABASE_URL` nos arquivos `.env` e `.env.local`.
- [x] Adicionar os scripts de geração e migração de banco no `package.json` (ex: `"postinstall": "prisma generate"`).

### Story 4.2: Modelagem Relacional ("Show, Don't Tell")

- [x] Modelar a tabela `Project` incluindo os novos campos de Case Study (`tier`, `challenge`, `solution`, `impact`, `githubUrl`, `liveUrl`).
- [x] Modelar a tabela `Experience` (cargos, empresas, datas, descrição).
- [x] Modelar a tabela `Skill` (apenas nome e ícone/categoria, removendo porcentagens).
- [x] Criar as tabelas pivô (N:M) para os relacionamentos:
  - `ProjectSkill`: Para vincular quais tecnologias foram usadas em cada projeto.
  - `ExperienceProject`: Para vincular quais projetos foram desenvolvidos/entregues durante a sua passagem por uma empresa específica.

### Story 4.3: Seeding e Migração dos JSONs

- [x] Criar o arquivo de popular o banco (`prisma/seed.ts`).
- [x] Escrever o script que lê os arquivos `projects.json`, `experiences.json` e `skills.json` atuais e insere os registros no banco de dados, estabelecendo os relacionamentos.
- [x] Rodar a primeira migração (`npx prisma migrate dev`) e o seed para ter a base local pronta com o histórico atual.

### Story 4.4: Refatoração do Consumo de Dados no Next.js

- [x] Criar o arquivo de instância Singleton do Prisma Client (ex: `src/_utils/prisma.ts`) para evitar vazamento de conexões no modo dev.
- [ ] Refatorar as rotas da API (`src/app/api/...`) e/ou Server Components para buscar os dados diretamente do PostgreSQL em vez dos arquivos JSON.
- [ ] Utilizar os relacionamentos (`include`) do Prisma para trazer os projetos com suas respectivas skills embutidas.
- [ ] Validar a renderização no front-end e, em seguida, **deletar com orgulho** a pasta `src/app/_data/` com os `.json` antigos.
