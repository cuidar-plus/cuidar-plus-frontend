# Cuidar + — Guia de Estilos e Padrões de Código (Angular & Python)

> Documento oficial de engenharia para padronização de código no **Cuidar +**. Abrange **Angular (FE)** e **Python/Django (BE)**, incluindo formatação, nomenclatura, arquitetura, testes, segurança e revisão.

---

## 0) Princípios

- **Leiturabilidade > esperteza**: prefira código simples e explícito.
- **Tipagem forte**: `strict` no TS, `mypy` no Python.
- **Imutabilidade e pureza** quando aplicável (NgRx, funções puras).
- **Observabilidade**: logs estruturados, métricas e tracing.
- **Segurança by default**: validações, least privilege, dados sensíveis protegidos.

---

## 1) Padrões Globais

- **Conventional Commits**: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:` etc.
- **Branching (Gitflow light)**: `feature/<ticket>`, `hotfix/<descr>`, `release/<ver>`.
- **Linters & Formatters**: **Prettier/ESLint** (FE), **Black/Flake8/isort** (BE).
- **Testes obrigatórios**: unitários + integração; e2e quando aplicável.
- **PRs**: pequenos, com descrição, checklist e screenshots/logs de testes.

---

## 2) Frontend — Angular

### 2.1 Estrutura de Projeto (Nx)

```
apps/
  web/                 # App principal
libs/
  ui/                  # Design system (componentes compartilhados)
  core/                # Serviços core (auth, http, interceptors)
  features/<modulo>/   # Feature modules (pacientes, insumos, etc.)
  data-access/<dominio>/ # NgRx stores, facades, models, API services
```

### 2.2 Nomenclatura

- **Componentes**: `PacienteFormComponent`, arquivos `paciente-form.component.ts`.
- **Módulos**: `PacientesModule` → `pacientes.module.ts`.
- **Serviços**: `PacientesService` → `pacientes.service.ts`.
- **Seletores/Actions (NgRx)**: `selectPacientesList`, `loadPacientes`, `loadPacientesSuccess`.
- **Observables**: sufixo `$` (`pacientes$`).

### 2.3 Estilo de Código

- **Change Detection**: `OnPush` por padrão.
- **Standalone Components**: preferir, modularizando por feature.
- **Inputs/Outputs**: usar `readonly` quando possível; emitir eventos com `EventEmitter<T>`.
- **RxJS**: evitar aninhamento; usar `pipe(...)`; operadores puros (`map`, `switchMap`, `catchError`). Não usar `subscribe` em componentes sem `takeUntilDestroyed()`.
- **Tipos**: `strict: true`, `noImplicitAny`, `prefer-readonly`.
- **Templates**: sem lógica complexa; mover para o TS. Usar `trackBy` em \*ngFor.
- **CSS**: `:host { display: block; }`; BEM opcional, Tailwind utilitário; evitar estilos globais.

### 2.4 Arquitetura

- **Camadas**: `ui` (dumb/presentational), `features` (smart), `data-access` (NgRx + API), `core` (cross-cutting).
- **NgRx**: usar `createAction`, `createReducer`, `createFeature`, `createSelector`; efeitos idempotentes; side-effects isolados em `Effects`.
- **HTTP**: `HttpClient` via serviços; interceptors para auth e tracing; tipar respostas.
- **Erros**: handler global; toasts/alerts padronizados; mensagens sem dados sensíveis.

### 2.5 Testes (FE)

- **Unit**: Jest para componentes/serviços; estratégias com TestBed stand-alone.
- **Store**: testar reducers/seletores/efeitos com marbles.
- **E2E**: Cypress, com IDs de teste (`data-cy`), cenários críticos; rodar em CI.
- **Cobertura**: meta mínima 80% (linhas) por lib/app.

### 2.6 Acessibilidade & i18n

- **A11y**: usar roles/aria, contraste AA, foco visível, navegação por teclado.
- **i18n**: `ngx-translate`; chaves `feature.section.key`; evitar string literal no template.

### 2.7 Performance

- Lazy loading por feature; `import()` dinâmico.
- `trackBy` em listas; `async` pipe onde possível.
- Imagens otimizadas; `cdk-virtual-scroll` para listas grandes.

---

## 3) Backend — Python / Django / DRF

### 3.1 Estilo e Formatação

- **PEP 8 + Black** (linha 88 colunas), **isort** (seção padrão), **Flake8** (limites de complexidade), **mypy** com `strict = True` no escopo do projeto.
- **Docstrings**: Google style ou reStructuredText; obrigatórias em públicos.
- **Type hints**: em funções públicas e modelos; `from __future__ import annotations`.

### 3.2 Estrutura de Apps

```
project/
  settings/
  apps/
    pacientes/
    insumos/
    farmacia/
    relatorios/
    plataforma/   # auth, rbac, usuarios
  common/         # libs compartilhadas (utils, mixins, validators)
```

### 3.3 Modelos e Migrations

- **Modelagem explícita**: `verbose_name`, `db_index`, `unique_together` quando aplicável.
- **Campos sensíveis**: criptografar ou pseudonimizar; evitar `TextField` para dados críticos.
- **Migrations**: pequenas, revisadas; `RunPython` idempotente; evitar data migrations pesadas em hot path.

### 3.4 DRF — Serializers, Views e URLs

- **Serializers**: validar no `validate_<field>` e `validate`; separar `Read`/`Write` serializadores quando necessário; campos aninhados somente quando estável.
- **Views**: `ViewSet` + roteamento padrão; `GenericViewSet` + `ModelViewSet` quando CRUD; regras complexas em `services`/`domain` com funções puras.
- **Filtros/Paginação**: `LimitOffset` ou `CursorPagination` por padrão; filtros com `django-filter`.
- **Erros**: respostas JSON consistentes, códigos corretos, mensagens neutras.

### 3.5 Serviços e Domínio

- Colocar regras de negócio em `services.py` ou pacote `domain/`.
- Funções puras testáveis, sem dependências de framework quando possível.

### 3.6 Segurança

- **Auth**: Django OAuth Toolkit (Authorization Code + PKCE); expiração curta, refresh tokens rotativos.
- **Permissões**: `IsAuthenticated` por padrão; `DjangoModelPermissions`/custom para RBAC.
- **Dados**: mascarar logs; `SECURE_*` flags, HSTS; `X-Content-Type-Options`, `Referrer-Policy`.
- **Upload**: validar MIME/size; antivírus opcional (clamd) em anexos.

### 3.7 Testes (BE)

- **Unitários**: `pytest`, `pytest-django`, `factory_boy`, `faker`.
- **Integração**: testes de API com `APIClient`; contratos OpenAPI verificados (schemathesis/prism opcional).
- **Cobertura**: meta mínima 85% para apps core.

### 3.8 Logs & Observabilidade

- **Logging**: `structlog` com `request_id`, `user_id`, `path`, `latency_ms`; sem dados sensíveis.
- **Tracing**: OpenTelemetry (HTTP server/client, DB), export para OTLP; correlação com FE via header.
- **Métricas**: Prometheus (latência, throughput, erros por endpoint, jobs Celery).

### 3.9 Banco de Dados e Desempenho

- Índices para campos usados em filtros/ordenações; `EXPLAIN` em queries críticas.
- **N+1**: usar `select_related`/`prefetch_related`.
- **Transações**: `atomic()` para operações compostas; idempotência em tasks.

---

## 4) Qualidade, Segurança e PR Checklist

**Checklist de PR**

- [ ] Descrição clara do problema/solução
- [ ] Cobertura de testes atualizada (CI verde)
- [ ] Lint/format (ESLint/Prettier/Black/isort/Flake8/mypy) sem erros
- [ ] Atualização de docs/OpenAPI quando necessário
- [ ] Migrações revisadas e seguras para produção
- [ ] Logs/erros adequados; sem dados sensíveis
- [ ] Screenshots/gifs (FE) ou exemplos de payload (BE)

**Políticas**

- Secrets fora do repo (Vault/Secrets Manager); `.env` só local.
- Dependabot/pyup/npm-audit ativos; versões pinadas.
- Feature flags para mudanças arriscadas.

---

## 5) Padrões de Commit e Mensagens

```
feat(pacientes): adiciona formulário reativo e validação de CPF
fix(farmacia): corrige cálculo de validade no lote
refactor(insumos): extrai serviço de mapeamento
chore(ci): atualiza pipeline de testes
docs(readme): adiciona instruções de setup
```

---

## 6) Documentação e OpenAPI

- Manter **OpenAPI** sincronizado (DRF Spectacular/Swagger).
- Exemplos de requests/responses; códigos de erro padronizados.
- Changelog por versão; ADRs para decisões arquiteturais.

---

## 7) Exemplos Rápidos

**Angular (efeito NgRx):**

```ts
loadPacientes$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PacientesActions.loadPacientes),
    switchMap(() =>
      this.api.list().pipe(
        map(data => PacientesActions.loadPacientesSuccess({ data })),
        catchError(error => of(PacientesActions.loadPacientesFailure({ error })))
      )
    )
  )
);
```

**Django (service + viewset):**

```py
# services.py
def criar_plano_cuidado(paciente_id: int, dto: PlanoDTO) -> Plano:
    # regras e validações de domínio
    ...

# views.py
class PlanoViewSet(ModelViewSet):
    serializer_class = PlanoWriteSerializer
    queryset = Plano.objects.all()

    def perform_create(self, serializer):
        plano = criar_plano_cuidado(
            paciente_id=serializer.validated_data["paciente"].id,
            dto=serializer.validated_data,
        )
        return plano
```

---

## 8) Manutenção e Evolução

- Revisão trimestral do guia; abrir issues para sugestões.
- Automatizar lint/format/test em `pre-commit`.
- Medir dívida técnica via SonarQube; ações em cada release.

---

**Anexos úteis**: `.editorconfig`, `tsconfig.strict.json`, `pyproject.toml` (Black/isort/mypy), `pre-commit-config.yaml`.
