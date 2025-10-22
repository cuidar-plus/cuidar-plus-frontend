.PHONY: help setup install dev build test lint format clean docker-build docker-up docker-down

# Default target
help: ## Mostra esta ajuda
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development
setup: ## Configura o projeto pela primeira vez
	@echo "🔧 Configurando projeto..."
	corepack enable
	pnpm install
	@echo "✅ Projeto configurado com sucesso!"

install: ## Instala dependências
	@echo "📦 Instalando dependências..."
	pnpm install

dev: ## Inicia servidor de desenvolvimento
	@echo "🚀 Iniciando servidor de desenvolvimento..."
	pnpm start

build: ## Build de produção
	@echo "🏗️ Fazendo build de produção..."
	pnpm build:prod

build-dev: ## Build de desenvolvimento
	@echo "🏗️ Fazendo build de desenvolvimento..."
	pnpm build

# Testing
test: ## Executa testes unitários
	@echo "🧪 Executando testes..."
	pnpm test --watchAll=false

test-watch: ## Executa testes em modo watch
	@echo "👀 Executando testes em modo watch..."
	pnpm test:watch

test-coverage: ## Executa testes com cobertura
	@echo "📊 Executando testes com cobertura..."
	pnpm test:coverage

e2e: ## Executa testes E2E
	@echo "🎭 Executando testes E2E..."
	pnpm e2e:headless

e2e-open: ## Abre Cypress para testes E2E interativos
	@echo "🎭 Abrindo Cypress..."
	pnpm e2e

# Code Quality
lint: ## Executa linters
	@echo "🔍 Executando linters..."
	pnpm lint
	pnpm stylelint
	pnpm prettier

lint-fix: ## Corrige problemas de linting automaticamente
	@echo "🔧 Corrigindo problemas de linting..."
	pnpm format

format: ## Formata código
	@echo "💄 Formatando código..."
	pnpm format

# Storybook
storybook: ## Inicia Storybook
	@echo "📖 Iniciando Storybook..."
	pnpm storybook

build-storybook: ## Build do Storybook
	@echo "📖 Fazendo build do Storybook..."
	pnpm build-storybook

# Utilities
clean: ## Limpa arquivos gerados
	@echo "🧹 Limpando arquivos gerados..."
	rm -rf dist/ node_modules/.cache .angular/cache coverage/ storybook-static/

clean-all: ## Limpa tudo (incluindo node_modules)
	@echo "🧹 Limpando tudo..."
	rm -rf dist/ node_modules/ .angular/ coverage/ storybook-static/

# Docker
docker-build: ## Build da imagem Docker
	@echo "🐳 Fazendo build da imagem Docker..."
	docker build -t cuidar-plus-frontend .

docker-up: ## Sobe containers de desenvolvimento
	@echo "🐳 Subindo containers..."
	docker compose -f docker-compose.dev.yml up -d

docker-down: ## Para containers
	@echo "🐳 Parando containers..."
	docker compose -f docker-compose.dev.yml down

# Pre-commit
precommit: ## Executa verificações de pre-commit
	@echo "🔍 Executando verificações de pre-commit..."
	pnpm precommit

# Utilities for CI/CD
ci-install: ## Instala dependências para CI
	@echo "📦 Instalando dependências para CI..."
	pnpm install --frozen-lockfile

ci-test: ## Executa testes para CI
	@echo "🧪 Executando testes para CI..."
	pnpm test --watchAll=false --coverage --passWithNoTests

ci-build: ## Build para CI
	@echo "🏗️ Fazendo build para CI..."
	pnpm build:prod --progress=false

ci-lint: ## Executa linters para CI
	@echo "🔍 Executando linters para CI..."
	pnpm lint --max-warnings=0
	pnpm stylelint
	pnpm prettier --check "src/**/*.{ts,html,scss,css,js,json}"