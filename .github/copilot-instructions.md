# Instruções para Agentes de IA — Cuidar+

## Visão Geral do Projeto

O **Cuidar+** é uma aplicação web para gestão de empresas de Home Care, focada em pacientes, profissionais de saúde, controle de insumos e relatórios clínicos. A arquitetura é baseada em microsserviços com frontend Angular e backend Django REST Framework.

## Arquitetura e Stack Tecnológica

### Frontend

- **Framework**: Angular 17+ (standalone components)
- **Estado**: NgRx para gerenciamento global
- **Estilos**: Tailwind CSS + ShadCN/UI + Design System próprio
- **Estrutura**: Nx Monorepo com libs separadas (`ui/`, `core/`, `features/`, `data-access/`)
- **Testes**: Jest (unitários) + Cypress (E2E)

### Backend

- **Framework**: Django 5 + Django REST Framework
- **Autenticação**: OAuth2 + PKCE com Django OAuth Toolkit
- **Banco**: PostgreSQL 15
- **Cache/Filas**: Redis 7 + Celery
- **Armazenamento**: AWS S3/MinIO
- **Testes**: Pytest + FactoryBoy

### Infraestrutura

- **Containerização**: Docker + Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoramento**: Prometheus + Grafana + Sentry
- **IaC**: Terraform

## Estrutura de Módulos

### Principais Domínios

1. **Pacientes** (`/api/pacientes/`) - Gestão de dados clínicos e históricos
2. **Usuários** (`/api/usuarios/`) - Profissionais, permissões e autenticação
3. **Farmácia** (`/api/farmacia/`) - Insumos, medicamentos e rastreabilidade
4. **Relatórios** (`/api/relatorios/`) - Geração de relatórios customizáveis
5. **Configurações** (`/api/configuracoes/`) - Parâmetros e integrações

### Estrutura de Diretórios

```
backend/apps/
├── pacientes/
├── usuarios/
├── farmacia/
├── relatorios/
├── configuracoes/
└── common/  # utils, mixins, validators

frontend/libs/
├── ui/  # Design system components
├── core/  # Auth, HTTP, interceptors
├── features/  # Feature modules por domínio
└── data-access/  # NgRx stores, facades, API services
```

## Padrões de Código Obrigatórios

### Backend (Django)

- **Formatação**: Black (88 cols) + isort + Flake8 + mypy strict
- **Models**: Sempre incluir `created_at`, `updated_at`, `created_by`, `is_active`
- **APIs**: Retornar JSON estruturado `{data, message, status}`
- **Autenticação**: OAuth2 obrigatório em todos os endpoints
- **Auditoria**: Middleware de log automático em operações CRUD
- **Serviços**: Regras de negócio em `services.py` ou pacote `domain/`

### Frontend (Angular)

- **Change Detection**: `OnPush` por padrão
- **Components**: Preferir standalone components
- **Observables**: Sufixo `$`, usar `takeUntilDestroyed()`, evitar `subscribe` direto
- **NgRx**: Usar `createAction`, `createReducer`, `createFeature`, `createSelector`
- **Templates**: Sem lógica complexa, usar `trackBy` em listas
- **Estilos**: CSS Variables do design system, BEM opcional

## Convenções de Negócio

### Validações Críticas

- **CPF/CNS**: Validação obrigatória para pacientes
- **Medicamentos controlados**: Requerem autorização farmacêutica
- **Assinatura digital**: Suporte via ICP-Brasil
- **LGPD**: Dados sensíveis criptografados, logs sem informações pessoais

### Padrões de API

- **Endpoints**: `/api/{módulo}/` (ex: `/api/pacientes/`, `/api/farmacia/`)
- **Paginação**: LimitOffset ou CursorPagination
- **Filtros**: django-filter para queries complexas
- **Erros**: Códigos HTTP corretos, mensagens neutras

## Design System

### Paleta de Cores

- **Primária**: `#4A90E2` (Azul Serenity)
- **Sucesso**: `#00B894` (Verde Saúde)
- **Aviso**: `#F5A623` (Laranja Cuidado)
- **Erro**: `#E57373` (Vermelho Calmo)
- **Texto**: `#2C3E50` (Cinza Profundo)

### Componentes Base

- **Botões**: Radius 8px, padding 12×20px, transição 180ms
- **Inputs**: Altura 44px, radius 8px
- **Cards**: Radius 12px, sombra suave
- **Tokens**: CSS Variables (`--color-primary`, `--sp-md`, `--radius-md`)

### Acessibilidade

- Contraste mínimo 4.5:1 (WCAG 2.1 AA)
- Área clicável mínima 44×44px
- ARIA roles obrigatórios
- Suporte a `prefers-reduced-motion`

## Diretrizes para Geração de Código

### Mockups de Referência

- **Localização**: `docs/Mockups de Telas/stitch_cuidar_login/`
- **Telas Disponíveis**: Dashboard, Login, Lista de Pacientes, Ficha do Paciente, Farmácia, Usuários, Relatórios, Configurações
- **Uso**: Consulte os mockups (`.png` e `.html`) antes de implementar componentes de UI
- **Padrão**: Mantenha consistência visual com os layouts e fluxos definidos nos mockups

### Para cada Requisito Funcional

1. **Backend**: Model + Serializer + ViewSet + URLs
2. **Frontend**: Component + Service + NgRx (actions/reducer/effects)
3. **Testes**: Unitários obrigatórios (80%+ cobertura)

### Padrões de Implementação

- **Models Django**: Herdar de base com auditoria
- **Serializers**: Separar Read/Write quando necessário
- **Components Angular**: Standalone, OnPush, tipados
- **Services**: Injeção de dependência, observables tipados

### Nomenclatura

- **Backend**: snake_case (models, views, fields)
- **Frontend**: camelCase (propriedades), PascalCase (classes)
- **APIs**: kebab-case nas URLs
- **Commits**: Conventional Commits (`feat:`, `fix:`, `refactor:`)

## Integrações Externas

- **ICP-Brasil**: Assinatura digital de documentos
- **AWS S3**: Upload e armazenamento de arquivos
- **TISS/ANS**: Padrões do setor de saúde (futuro)
- **ERP**: Sincronização de dados contábeis

## Segurança e Compliance

- **LGPD**: Pseudonimização de dados sensíveis
- **Autenticação**: Tokens JWT com expiração curta
- **Autorização**: RBAC por módulo e recurso
- **Logs**: Estruturados com structlog, sem dados pessoais
- **Uploads**: Validação de MIME type e tamanho

## Observabilidade

- **Métricas**: Prometheus (latência, throughput, erros)
- **Logs**: ELK Stack com correlação de requests
- **Tracing**: OpenTelemetry para requisições distribuídas
- **Alertas**: Sentry para exceções e erros críticos

## Documentação de Referência

- **Regras de Negócio**: `docs/DRN_MRFT_Cuidar+.md`
- **Tecnologias**: `docs/cuidar_tecnologias_do_projeto.md`
- **Padrões de Código**: `docs/cuidar_guia_de_estilos_e_padroes_de_codigo_angular_python.md`
- **Design System**: `docs/cuidar_angular_design_system_v_1.md`
- **UI/UX**: `docs/ui-ux-documentation.md`
- **Mockups de Tela**: `docs/Mockups de Telas/` - Use como referência visual para padrões de interface

## Comandos Essenciais

### Desenvolvimento Local

```bash
# Backend
python manage.py runserver
python manage.py migrate
pytest --cov

# Frontend
ng serve
ng test
ng build

# Docker
docker-compose up -d
```

### Qualidade de Código

```bash
# Backend
black . && isort . && flake8 && mypy .

# Frontend
ng lint && ng test --code-coverage
```

Ao trabalhar neste projeto, sempre consulte a documentação específica em `docs/` para detalhes de implementação e mantenha consistência com os padrões estabelecidos.
