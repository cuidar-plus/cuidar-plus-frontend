# Cuidar+ — Frontend (Angular)

Aplicação web em **Angular 18+** com **standalone components** e Design System próprio.

## Requisitos

- Node LTS (via `nvm`), PNPM
- Docker (opcional para dev)
- Backend disponível em `http://localhost:8000` (configurável)

## Começando

```bash
corepack enable
pnpm i
pnpm start # http://localhost:4200
```

### Variáveis de ambiente

Crie `.env.local` (baseado em `.env.example`):

```
VITE_API_URL=http://localhost:8000
VITE_OAUTH2_ISSUER=http://localhost:8080/realms/cuidar
VITE_OAUTH2_CLIENT_ID=cuidar-web
```

> Configure `fileReplacements`/`environment.ts` para `staging`/`prod`.

## Scripts

- `pnpm start` — dev server
- `pnpm build` — build de produção
- `pnpm test` — unitários (Jest/Vitest)
- `pnpm e2e` — Cypress
- `pnpm lint` — ESLint/Prettier

## Estrutura

```
src/app/
  core/      # services, interceptors, guards
  shared/    # ui, componentes, pipes
  features/  # patients, users, inventory, pharmacy, reports, settings
```

## Qualidade

- ESLint + Prettier + Stylelint
- Husky + lint-staged (pre-commit)
- Storybook publicado no CI por PR

## Acessibilidade

Siga WCAG, use `aria-*` e verifique contraste de cores do Design System.

## CI/CD

- Lint + testes + build
- Deploy automático para `staging` via GitHub Actions
