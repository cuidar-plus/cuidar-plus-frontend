# Cuidar+ — Marco 0 (Setup Inicial)

> **Objetivo:** preparar o ambiente, repositórios, pipelines e padrões para iniciar o desenvolvimento dos módulos do Cuidar+ (Angular frontend + Django REST backend, OAuth2).  
> **Duração**: 0–1 sprint.  
> **Saída esperada:** todos os itens abaixo marcados como concluídos ✅, com PRs e documentação versionada.

---

## 1) Governança de Repositório & Projeto

- [ ] Criar **organização** no GitHub/GitLab (`cuidar-plus`).
- [ ] Criar repositórios:
  - [ ] `cuidar-plus-frontend` (Angular)
  - [ ] `cuidar-plus-backend` (Django REST)
  - [ ] `cuidar-plus-infra` (infra como código + automações)
  - [ ] `cuidar-plus-docs` (documentação: DRN, guias, ADRs, diagramas)
- [ ] Habilitar **branch protection** em `main`/`release/*` (PR obrigatório, reviews, checks).
- [ ] Definir **convenção de commits** (Conventional Commits) e **versionamento** (SemVer).
- [ ] Adicionar **templates**:
  - [ ] ISSUE_TEMPLATEs (bug, feature, doc)
  - [ ] PULL_REQUEST_TEMPLATE com checklist de testes/segurança
- [ ] Criar **CODEOWNERS** por pastas (front, back, infra, docs).
- [ ] Adicionar **LICENSE** (ex.: MIT) e **CONTRIBUTING.md**.
- [ ] Configurar **Projects**/Boards (Kanban) com épicos por módulo (Pacientes, Usuários, Insumos, Farmácia, Relatórios, Configurações).

---

## 2) Padrões de Código & Qualidade

- [ ] **EditorConfig** comum a todos os repositórios.
- [ ] **Pre-commit hooks**:
  - [ ] `black`, `ruff`, `isort`, `mypy` (backend)
  - [ ] `eslint`, `prettier`, `stylelint` (frontend)
  - [ ] Verificação de `.env` acidental (`git-secrets`/`detect-secrets`)
- [ ] **Linters/Formatters** configurados nos IDEs.
- [ ] **Testes**: cobertura mínima inicial 70% (unitários e de integração).
- [ ] **ADRs** (Architecture Decision Records) em `docs/adr/` (ex.: autenticação OAuth2, DB, mensageria).

---

## 3) Ambiente de Desenvolvimento (Local)

### 3.1 Ferramentas base

- [ ] Git ≥ 2.40
- [ ] Docker & Docker Compose
- [ ] Make (ou Taskfile) para comandos padronizados
- [ ] Node LTS (via `nvm`) e PNPM (ou npm)
- [ ] Python 3.12 (via `pyenv`) e Poetry **ou** `uv`/`pip-tools`
- [ ] PostgreSQL (via container)
- [ ] Redis (via container)
- [ ] OpenSSL (para gerar certificados dev)

### 3.2 Backend (Django REST)

- [ ] Criar projeto `django` com app base `core`
- [ ] Adicionar libs: `djangorestframework`, `drf-spectacular`, `django-environ`, `psycopg2-binary`, `django-cors-headers`, `django-oauth-toolkit`, `celery`, `redis`, `pytest`, `pytest-django`, `factory-boy`
- [ ] Estrutura sugerida:
  ```text
  backend/
    src/
      config/          # settings/, urls.py, wsgi/asgi
      core/
      patients/
      users/
      inventory/       # insumos
      pharmacy/
      reports/
      settings/
        base.py
        dev.py
        staging.py
        prod.py
    tests/
    manage.py
    pyproject.toml     # ou poetry
    Makefile
    docker/            # Dockerfile, compose, entrypoints
  ```
- [ ] Comandos Make básicos:
  ```make
  setup: ## instala deps
  	uv pip install -r requirements.txt || poetry install
  run: ## sobe api local
  	python manage.py runserver 0.0.0.0:8000
  test:
  	pytest -q --maxfail=1 --disable-warnings
  lint:
  	ruff check . && black --check . && mypy .
  migrate:
  	python manage.py migrate
  ```
- [ ] Migrations iniciais + **superuser** seed.
- [ ] **OpenAPI** com `drf-spectacular` em `/api/schema` e docs Swagger em `/api/docs`.

### 3.3 Frontend (Angular)

- [ ] Criar projeto Angular 18+ com **standalone components**.
- [ ] Adicionar libs: `@angular/material`, `@angular/cdk`, `rxjs`, `zod` ou `valibot`, `@ngrx/store` (opcional), `eslint`, `prettier`, `jest` ou `vitest`, `cypress` (e2e)
- [ ] Estrutura sugerida:
  ```text
  frontend/
    src/app/
      core/
      shared/
      features/
        patients/
        users/
        inventory/
        pharmacy/
        reports/
        settings/
    .eslintrc.cjs
    jest.config.ts (ou vitest.config.ts)
    package.json
    angular.json
    Makefile
    docker/
  ```
- [ ] **Theming/Design System** base (tokens, tipografia, cores, espaçamentos).
- [ ] **Env files** (`.env.local`, `.env.staging`, `.env.prod`) consumidos via `fileReplacements`/`environment.ts`.

---

## 4) Contêineres & Orquestração

- [ ] Compose de desenvolvimento com serviços: `web`, `api`, `db` (PostgreSQL), `cache` (Redis), `worker` (Celery), `nginx` (reverse proxy), `keycloak` **ou** `oauth2-provider` (opcional para dev).
- [ ] Volumes nomeados para persistência local (db, cache).
- [ ] Hot-reload mapeado (bind mounts).

Exemplo `docker-compose.dev.yml` (resumo):

```yaml
services:
  api:
    build: ./backend
    env_file: ./backend/.env.local
    ports: ['8000:8000']
    depends_on: [db, cache]
  web:
    build: ./frontend
    env_file: ./frontend/.env.local
    ports: ['4200:4200']
    depends_on: [api]
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: cuidar
      POSTGRES_USER: cuidar
      POSTGRES_PASSWORD: cuidar
    volumes: [db_data:/var/lib/postgresql/data]
  cache:
    image: redis:7
volumes:
  db_data: {}
```

---

## 5) Segurança & Segredos

- [ ] `.env.example` com todas as variáveis necessárias (sem valores sensíveis).
- [ ] Armazenamento seguro de segredos (GitHub Environments/Secrets, 1Password/Vault).
- [ ] Rotacionar chaves e tokens a cada deploy maior.
- [ ] **HTTPS** em todos os ambientes (Let's Encrypt em staging/prod).
- [ ] **CORS/CSRF** configurados e testados.
- [ ] Cabeçalhos de segurança (Nginx/Django middlewares).

Variáveis mínimas:

```bash
DJANGO_SECRET_KEY=
DATABASE_URL=postgres://cuidar:cuidar@db:5432/cuidar
REDIS_URL=redis://cache:6379/0
OAUTH2_PROVIDER_URL=
ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_SETTINGS_MODULE=config.settings.dev
```

---

## 6) Autenticação & Autorização (OAuth2)

- [ ] Definir **provedor** (Keycloak, Auth0, Django OAuth Toolkit).
- [ ] Fluxo recomendado: **Authorization Code + PKCE**.
- [ ] Mapear **escopos** por módulo (ex.: `patients:read`, `patients:write`).
- [ ] Configurar **RBAC** (roles: admin, coordenador, profissional, farmacêutico, auditor).
- [ ] Testar **refresh token** e expiração.
- [ ] Integração Angular (interceptor HTTP, refresh silencioso, rota de login/logout).
- [ ] Proteção de rotas (guards) e **feature toggles** por role.

---

## 7) Banco de Dados & Dados Iniciais

- [ ] Modelo inicial (Pacientes, Usuários, Insumos, Itens de Farmácia, Movimentações, Prescrições, Relatórios, Configurações).
- [ ] **Seeds** seguros (usuário admin, perfis de acesso, catálogos).
- [ ] Políticas de **backup** (staging/prod) e **migrações** controladas.
- [ ] Índices iniciais, constraints e chaves estrangeiras.
- [ ] Política de **LGPD** (retenção, anonimização de dados sensíveis em dumps).

---

## 8) Observabilidade & Operação

- [ ] **Logs** estruturados (JSON) na API; correlação de request-id.
- [ ] **Tracing** (OpenTelemetry) opcional.
- [ ] **Métricas** (Prometheus) e **dashboards** (Grafana).
- [ ] **Health checks** (`/healthz`, `/readiness`).
- [ ] Alertas básicos (latência API, falhas 5xx, filas Celery).

---

## 9) CI/CD (mínimo viável)

- [ ] Pipeline **CI**: lint, testes, build, análise SAST (CodeQL ou Semgrep).
- [ ] Pipeline **CD**: build de imagens, push para registry, deploy em **staging**.
- [ ] Estratégia de **releases** (tags, changelog automático).
- [ ] **Storybook** do Design System publicado (frontend).
- [ ] **Swagger/OpenAPI** publicado (backend).

Exemplo (resumo) de jobs CI:

```yaml
name: ci
on: [pull_request, push]
jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install uv && uv pip install -r requirements-dev.txt
      - run: make lint test
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 'lts/*' }
      - run: corepack enable && pnpm i
      - run: pnpm lint && pnpm test
```

---

## 10) Documentação

- [ ] **README** por repo com instruções `clone → configure → run`.
- [ ] **Guia de setup** (este arquivo) em `cuidar-plus-docs` e linkado nos READMEs.
- [ ] **DRN** consolidado + diagramas (C4: contexto, contêiner, componentes).
- [ ] **Guia de estilos** de UI/UX (tokens, componentes, acessibilidade).
- [ ] **Guia de contribuição** e **Fluxo Git** (branching, releases, hotfixes).

---

## 11) Verificações Finais do Marco 0

- [ ] `docker compose up` sobe API, Web, DB e Redis sem erros.
- [ ] Angular acessa API via `NGINX`/proxy e lê variáveis de ambiente corretas.
- [ ] Login via OAuth2 funcionando em `dev` (mock/Keycloak).
- [ ] Testes passam no CI; artefatos (OpenAPI/Storybook) publicados.
- [ ] Seeds aplicados; usuário admin criado; RBAC mínimo validado.
- [ ] Documentação publicada e linkada nos repositórios.

---

### Scripts úteis (exemplos)

```bash
# backend
make setup && make migrate && make run

# frontend
pnpm install && pnpm start

# compose (dev)
docker compose -f docker-compose.dev.yml up --build
```

---

## Próximos passos (após Marco 0)

1. Fechar ADRs pendentes (mensageria, filas, geração de relatórios).
2. Iniciar épico **Pacientes** (MVP de cadastro e prontuário simplificado).
3. Integrar Storybook ao pipeline e publicar preview por PR.
4. Configurar staging em nuvem (RDS PostgreSQL, Redis gerenciado, HTTPS).
