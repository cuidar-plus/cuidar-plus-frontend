# Contribuindo

Obrigado por contribuir! Este projeto segue **Conventional Commits** e **SemVer**.

## Fluxo Git

- `main`: estável.
- `develop` (opcional): integração.
- Branches por tipo: `feat/…`, `fix/…`, `chore/…`, `docs/…`, `refactor/…`.
- Use PRs com revisão obrigatória e cobertura de testes mínima (>= 70% inicial).

## Commits (Conventional Commits)

Exemplos:

- `feat(patients): adiciona formulário de cadastro`
- `fix(auth): corrige refresh token expirado`
- `docs(readme): atualiza instruções`

## Código de Conduta

Seja respeitoso. Divergências técnicas devem ser resolvidas em PRs e ADRs.

## Como abrir um PR

1. Abra uma issue (bug/feature).
2. Crie uma branch a partir de `main` (ou `develop`).
3. Rode lint e testes localmente.
4. Abra PR com o template e evidências de teste.

## Segurança

**Nunca** commitar segredos. Use `.env.example` e repositório de segredos do provedor (GitHub/Environments).

## Padrões de UI/UX

- Use o Design System do `cuidar-plus-docs` (tokens e componentes).
- Toda feature deve incluir **stories** no Storybook e **testes**.
