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
