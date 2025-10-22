# Cuidar + — Tecnologias do Projeto

O documento a seguir descreve detalhadamente as tecnologias, frameworks, ferramentas e serviços que compõem a arquitetura da aplicação **Cuidar +**, uma plataforma web para gestão de empresas de Home Care. O objetivo é garantir padronização, rastreabilidade e clareza técnica em todas as camadas do sistema.

---

## 1) Visão Geral da Arquitetura

- **Tipo:** Aplicação Web modular baseada em microsserviços.
- **Frontend:** SPA em Angular.
- **Backend:** API RESTful com Django REST Framework.
- **Infraestrutura:** Contêineres Docker orquestrados em Kubernetes.
- **Autenticação:** OAuth2 (Authorization Code + PKCE).
- **Banco de Dados:** PostgreSQL 15.
- **Mensageria e Cache:** Redis 7 + Celery.
- **Armazenamento de Arquivos:** AWS S3 / MinIO.
- **Monitoramento e Logs:** Prometheus, Grafana, Sentry e ELK Stack.

---

## 2) Frontend

| Categoria           | Tecnologia                               | Finalidade                                 |
| ------------------- | ---------------------------------------- | ------------------------------------------ |
| Framework           | **Angular 17+**                          | Base da aplicação SPA.                     |
| Linguagem           | **TypeScript 5+**                        | Linguagem com tipagem estática.            |
| Estilos             | **Tailwind CSS** + **ShadCN/UI**         | Estilo moderno e responsivo.               |
| Estado              | **NgRx**                                 | Gerenciamento de estado global e imutável. |
| Internacionalização | **ngx-translate**                        | Tradução de textos e labels.               |
| Testes              | **Jest** (unitários) + **Cypress** (E2E) | Automação de testes e2e e unitários.       |
| Build & Tooling     | **Nx Monorepo** + **Vite**               | Estrutura modular e build rápido.          |
| Observabilidade     | **Sentry** + **Google Analytics 4**      | Monitoramento e métricas de UX.            |

---

## 3) Backend

| Categoria                 | Tecnologia                               | Finalidade                                  |
| ------------------------- | ---------------------------------------- | ------------------------------------------- |
| Framework                 | **Django 5** + **Django REST Framework** | Criação da API RESTful.                     |
| Linguagem                 | **Python 3.12**                          | Linguagem principal do backend.             |
| Autenticação              | **Django OAuth Toolkit**                 | Gestão de tokens OAuth2 + PKCE.             |
| Banco de Dados            | **PostgreSQL 15**                        | Armazenamento de dados estruturados.        |
| Cache/Fila                | **Redis 7**                              | Cache de sessões e fila Celery.             |
| Tarefas Assíncronas       | **Celery**                               | Processamento em segundo plano.             |
| Armazenamento de Arquivos | **AWS S3 / MinIO**                       | Hospedagem de anexos e documentos clínicos. |
| Logs Estruturados         | **Structlog** + **ELK Stack**            | Coleta e indexação de logs.                 |
| Testes                    | **Pytest** + **FactoryBoy**              | Testes unitários e integração.              |
| Documentação              | **OpenAPI / Swagger**                    | Geração automática de documentação.         |

---

## 4) Infraestrutura e DevOps

| Categoria                  | Tecnologia                     | Finalidade                                 |
| -------------------------- | ------------------------------ | ------------------------------------------ |
| Containerização            | **Docker**                     | Empacotamento de serviços e dependências.  |
| Orquestração               | **Kubernetes (EKS/GKE)**       | Deploy escalável e tolerante a falhas.     |
| Proxy / Ingress            | **Traefik / NGINX Ingress**    | Roteamento e balanceamento de carga.       |
| Infraestrutura como Código | **Terraform**                  | Provisionamento automatizado de ambientes. |
| CI/CD                      | **GitHub Actions**             | Automação de builds, testes e deploys.     |
| Versionamento              | **GitFlow + Semantic Release** | Fluxo de versionamento e releases.         |
| Backups                    | **Velero / Restic**            | Backup e restauração de volumes e bancos.  |
| Observabilidade            | **Prometheus + Grafana**       | Monitoramento de métricas e alertas.       |
| Logs Centralizados         | **ELK Stack**                  | Consolidação e busca de logs.              |

---

## 5) Segurança e Compliance

| Área         | Tecnologia / Padrão                  | Descrição                         |
| ------------ | ------------------------------------ | --------------------------------- |
| Autenticação | **OAuth2 + PKCE**                    | Controle de sessão seguro.        |
| Autorização  | **RBAC (Role-Based Access Control)** | Permissões por papel e recurso.   |
| Criptografia | **TLS 1.3 / AES-256**                | Segurança em trânsito e repouso.  |
| Auditoria    | **Logs Imutáveis (WORM)**            | Rastreamento de ações críticas.   |
| MFA          | **TOTP / App Authenticator**         | Autenticação multifator opcional. |
| Compliance   | **LGPD + OWASP ASVS Nível 2**        | Conformidade e proteção de dados. |

---

## 6) Testes e Qualidade

| Tipo            | Ferramenta                     | Objetivo                             |
| --------------- | ------------------------------ | ------------------------------------ |
| Unitários       | **Pytest / Jest**              | Garantir integridade de componentes. |
| Integração      | **Cypress / DRF Tests**        | Validar fluxos de API e interface.   |
| Estáticos       | **ESLint, Pylint, MyPy**       | Garantir padrões de código.          |
| Segurança       | **Bandit / Trivy**             | Scans de vulnerabilidade.            |
| QA Automatizado | **SonarQube + GitHub Actions** | Monitoramento de qualidade contínua. |

---

## 7) Observabilidade e Telemetria

| Categoria  | Ferramenta        | Finalidade                                    |
| ---------- | ----------------- | --------------------------------------------- |
| Logs       | **ELK / Loki**    | Coleta e visualização centralizada.           |
| Métricas   | **Prometheus**    | Coleta e análise de desempenho.               |
| Dashboards | **Grafana**       | Visualização de KPIs técnicos e operacionais. |
| Erros      | **Sentry**        | Notificação e rastreamento de exceções.       |
| Tracing    | **OpenTelemetry** | Rastreamento distribuído de requisições.      |

---

## 8) Integrações Externas

| Integração     | Descrição                             | Padrão                   |
| -------------- | ------------------------------------- | ------------------------ |
| ERP / Contábil | Sincronização de faturamento e custos | REST / Webhooks          |
| BI / Analytics | Exportação de dados agregados         | ETL / PostgreSQL Replica |
| Notificações   | Alertas e lembretes automáticos       | FCM / Twilio / SMTP      |
| SSO / IdP      | Autenticação corporativa              | OAuth2 / SAML 2.0        |

---

## 9) Ambientes de Deploy

| Ambiente                  | Características                                                    |
| ------------------------- | ------------------------------------------------------------------ |
| **Desenvolvimento**       | Docker Compose, hot reload e base de dados seed.                   |
| **Homologação (Staging)** | Deploy contínuo, base parcial e Sentry ativo.                      |
| **Produção**              | Cluster Kubernetes, autoscaling, backups e monitoramento completo. |

---

## 10) Próximos Passos Técnicos

1. Criar guia de estilo e padrões de código para Angular e Python.
2. Implementar OpenTelemetry completo para tracing distribuído.
3. Definir política de versionamento e depreciação de APIs (v1/v2).
4. Adotar MFA obrigatório para usuários administrativos.
5. Avaliar uso de **FastAPI** em microserviços futuros de alta performance.
