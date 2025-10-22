# 🩺 CUIDAR+ – DRN & MRFT

**Versão:** 1.0  
**Data:** 21/10/2025  
**Documento:** Regras de Negócio e Matriz de Requisitos Funcionais e Técnicos  
**Autor:** Parceiro de Negócios Cuidar+ / GPT-5  
**Repositório:** CuidarPlus / docs  
**Finalidade:** Base para desenvolvimento orientado por IA (GitHub Copilot)

---

## ⚙️ META-INFORMAÇÕES

```yaml
sistema: Cuidar+
tipo: DRN_MRFT
stack:
  frontend: Angular
  backend: Django REST Framework
  autenticação: OAuth2 + JWT
  banco_dados: PostgreSQL
  integrações:
    - ICP-Brasil (assinatura digital)
    - ANS / TISS (futuro)
    - AWS S3 (armazenamento)
```

---

## 🧠 VISÃO DO SISTEMA

O **Cuidar+** é uma aplicação web voltada para **gestão de empresas de Home Care**, com foco em:

- Gestão de pacientes e profissionais de saúde;
- Controle de insumos, medicamentos e equipamentos;
- Relatórios clínicos e administrativos;
- Conformidade com a LGPD e normas da ANVISA.

---

## 🧩 MÓDULOS PRINCIPAIS

1. **Pacientes** – Gerencia dados clínicos e históricos.
2. **Usuários** – Perfis e permissões de profissionais.
3. **Farmácia / Insumos** – Controle de estoque e rastreabilidade.
4. **Relatórios** – Geração de relatórios customizáveis.
5. **Configurações** – Parâmetros, integrações e logs.

---

## 📜 REGRAS DE NEGÓCIO (DRN)

### Módulo: Pacientes

- RN-PAC-01 → Cada paciente deve ter **ID único, CPF/CNS válido**.
- RN-PAC-02 → Permitir upload de **documentos obrigatórios (RG, CPF, Termo LGPD)**.
- RN-PAC-04 → Manter **histórico clínico completo** (evoluções, prescrições, anexos).
- RN-PAC-06 → Paciente deve estar **vinculado a equipe de atendimento**.
- RN-PAC-07 → Enviar alerta de **plano de cuidado vencido**.

### Módulo: Usuários

- RN-USR-01 → Cada profissional deve ter **login único e perfil definido**.
- RN-USR-03 → Permissões **baseadas em papéis (RBAC)**.
- RN-USR-05 → Registros devem permitir **assinatura digital**.
- RN-USR-06 → Controle de **escala e plantões** por profissional.

### Módulo: Farmácia / Insumos

- RN-FAR-01 → Cada insumo deve conter **lote, validade e fabricante**.
- RN-FAR-02 → Registrar **entrada, saída e destino (paciente)**.
- RN-FAR-03 → Alertas automáticos de **vencimento e estoque mínimo**.
- RN-FAR-04 → Medicamentos controlados exigem **autorização farmacêutica**.

### Módulo: Relatórios

- RN-REL-01 → Gerar relatórios padrão e customizados.
- RN-REL-03 → Filtros dinâmicos por data, paciente e profissional.
- RN-REL-05 → Logs e auditorias automáticas em cada relatório.

### Módulo: Configurações

- RN-CONF-01 → Cadastro e edição de **perfis de acesso**.
- RN-CONF-03 → Integrações externas via **API REST**.
- RN-CONF-04 → Registro de **logs e auditorias** do sistema.

---

## 💻 MATRIZ DE REQUISITOS FUNCIONAIS E TÉCNICOS (MRFT)

### Estrutura de Referência

| Campo                   | Descrição                        |
| ----------------------- | -------------------------------- |
| **ID**                  | Identificador único do requisito |
| **Origem (RN)**         | Regra de negócio associada       |
| **Descrição Funcional** | O que o sistema deve fazer       |
| **Descrição Técnica**   | Como o sistema deve fazer        |
| **Prioridade**          | Alta / Média / Baixa             |
| **Responsável**         | Time ou módulo responsável       |

---

### Módulo: Pacientes

| ID        | Origem    | Descrição Funcional                                     | Descrição Técnica                                            | Prioridade | Responsável |
| --------- | --------- | ------------------------------------------------------- | ------------------------------------------------------------ | ---------- | ----------- |
| RF-PAC-01 | RN-PAC-01 | Cadastro completo de paciente com validação de CPF/CNS. | Django Model `Paciente` + Validação + API `/api/pacientes/`. | Alta       | Backend     |
| RF-PAC-02 | RN-PAC-02 | Upload de documentos do paciente.                       | Angular File Upload + Django FileField + AWS S3.             | Alta       | Fullstack   |
| RF-PAC-04 | RN-PAC-04 | Histórico clínico (evoluções, prescrições).             | Django REST `/historico` + Angular Timeline UI.              | Alta       | Fullstack   |
| RF-PAC-05 | RN-PAC-07 | Alerta de plano de cuidado vencido.                     | Celery Scheduler + Email Service.                            | Média      | Backend     |

---

### Módulo: Usuários

| ID        | Origem    | Descrição Funcional                | Descrição Técnica                                  | Prioridade | Responsável |
| --------- | --------- | ---------------------------------- | -------------------------------------------------- | ---------- | ----------- |
| RF-USR-01 | RN-USR-01 | Autenticação via OAuth2.           | Django OAuth Toolkit + JWT.                        | Alta       | Backend     |
| RF-USR-02 | RN-USR-03 | Controle de permissões por módulo. | RBAC + ACL Tables.                                 | Alta       | Backend     |
| RF-USR-03 | RN-USR-05 | Registro de assinatura digital.    | API ICP-Brasil + Django Model `AssinaturaDigital`. | Alta       | Backend     |
| RF-USR-04 | RN-USR-06 | Gestão de escalas e plantões.      | Angular Calendar + API `/api/escalas/`.            | Média      | Fullstack   |

---

### Módulo: Farmácia / Insumos

| ID        | Origem    | Descrição Funcional                                     | Descrição Técnica                                  | Prioridade | Responsável |
| --------- | --------- | ------------------------------------------------------- | -------------------------------------------------- | ---------- | ----------- |
| RF-FAR-01 | RN-FAR-01 | Cadastro de insumos (código, lote, validade).           | Django Model `Insumo` + REST API `/api/farmacia/`. | Alta       | Backend     |
| RF-FAR-02 | RN-FAR-02 | Controle de movimentação e rastreabilidade.             | Django Logs + API `/api/farmacia/movimentacoes/`.  | Alta       | Fullstack   |
| RF-FAR-03 | RN-FAR-03 | Alertas automáticos de validade e estoque.              | Celery + Notification Service.                     | Alta       | Backend     |
| RF-FAR-04 | RN-FAR-04 | Autorização farmacêutica para medicamentos controlados. | ACL + Role Check.                                  | Alta       | Backend     |

---

### Módulo: Relatórios

| ID        | Origem    | Descrição Funcional                    | Descrição Técnica                               | Prioridade | Responsável |
| --------- | --------- | -------------------------------------- | ----------------------------------------------- | ---------- | ----------- |
| RF-REL-01 | RN-REL-01 | Gerar relatórios padrão.               | Django REST + ReportLab + Pandas.               | Alta       | Backend     |
| RF-REL-02 | RN-REL-02 | Criar relatórios personalizados.       | Angular Report Builder + Dynamic Query API.     | Média      | Frontend    |
| RF-REL-03 | RN-REL-05 | Incluir logs e auditorias automáticas. | Middleware de Auditoria + PostgreSQL Log Table. | Alta       | Backend     |

---

### Módulo: Configurações

| ID         | Origem     | Descrição Funcional                | Descrição Técnica                        | Prioridade | Responsável |
| ---------- | ---------- | ---------------------------------- | ---------------------------------------- | ---------- | ----------- |
| RF-CONF-01 | RN-CONF-01 | Gestão de perfis e permissões.     | Django Admin + Angular Table.            | Alta       | Backend     |
| RF-CONF-02 | RN-CONF-03 | Integrações externas (TISS, CNES). | Django Integration Layer.                | Alta       | Backend     |
| RF-CONF-03 | RN-CONF-04 | Logs e auditorias do sistema.      | Middleware + Log Table.                  | Alta       | Backend     |
| RF-CONF-04 | RN-CONF-05 | Customização de templates.         | Angular Template Editor + PDF Generator. | Média      | Frontend    |

---

## 🔗 INTEGRAÇÕES E INFRAESTRUTURA

```yaml
infra:
  backend:
    framework: Django REST Framework
    scheduler: Celery + Redis
    database: PostgreSQL
  frontend:
    framework: Angular
    ui_lib: Angular Material
  cloud:
    storage: AWS S3
    email: SendGrid
    notifications: Firebase
  devops:
    version_control: GitHub
    ci_cd: GitHub Actions
```

---

## 🧪 TESTES E QUALIDADE

- **Testes Unitários:** Pytest / Jasmine
- **Cobertura mínima:** 80%
- **Testes de Integração:** Postman Collections
- **Validação de Negócio:** Revisão com stakeholders via staging environment
- **Auditoria de Logs:** Middleware obrigatório em todas as rotas `POST`, `PUT`, `DELETE`

---

## 🧱 DIRETRIZES PARA COPILOT

> ⚠️ Use este documento como base para geração automatizada de código.

**Instruções ao Copilot:**

1. Cada **RF** deve gerar:
   - 1 endpoint REST (`/api/...`)
   - 1 serializer Django
   - 1 model (quando aplicável)
   - 1 componente Angular (frontend)
2. Todos os endpoints devem:
   - Retornar JSON estruturado `{data, message, status}`
   - Ser autenticados via OAuth2
3. Cada model deve conter:
   - `created_at`, `updated_at`, `created_by`
   - `is_active` para soft delete
4. Logs automáticos:
   - Middleware em toda operação CRUD
5. Estrutura recomendada:
   ```
   backend/
     pacientes/
     usuarios/
     farmacia/
     relatorios/
     configuracoes/
   frontend/
     src/app/modules/
   ```

---

## ✅ CONCLUSÃO

Este documento é o **guia de implementação para o repositório GitHub do projeto Cuidar+**, garantindo:

- Consistência entre regras de negócio e código-fonte;
- Rastreabilidade de requisitos;
- Base técnica para o GitHub Copilot gerar APIs, Models e Components automaticamente.

> 🔖 **Salvar como:** `docs/DRN_MRFT_Cuidar+.md`  
> 📂 **Localização sugerida:** `/CuidarPlus/docs/`  
> 🧠 **Finalidade:** referência para Copilot, CI/CD e equipes de engenharia.
