# =============================================================================
# Multi-stage Dockerfile para Cuidar+ Frontend
# =============================================================================

# -----------------------------------------------------------------------------
# Estágio 1: Build da aplicação
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Habilitar Corepack para PNPM
RUN corepack enable

# Copiar arquivos de dependência
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação
ARG BUILD_CONFIGURATION=production
RUN pnpm build --configuration=${BUILD_CONFIGURATION}

# -----------------------------------------------------------------------------
# Estágio 2: Servidor de produção com Nginx
# -----------------------------------------------------------------------------
FROM nginx:1.25-alpine AS production

# Instalar curl para health checks
RUN apk add --no-cache curl

# Copiar configuração customizada do Nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos buildados
COPY --from=builder /app/dist/cuidar-plus-frontend /usr/share/nginx/html

# Copiar script de entrypoint
COPY docker/entrypoint.sh /docker-entrypoint.d/40-envsubst-on-templates.sh
RUN chmod +x /docker-entrypoint.d/40-envsubst-on-templates.sh

# Expor porta
EXPOSE 80

# Configurar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs && \
    chown -R nextjs:nodejs /usr/share/nginx/html && \
    chown -R nextjs:nodejs /var/cache/nginx && \
    chown -R nextjs:nodejs /var/log/nginx && \
    chown -R nextjs:nodejs /etc/nginx/conf.d

USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]

# -----------------------------------------------------------------------------
# Estágio 3: Desenvolvimento com hot-reload
# -----------------------------------------------------------------------------
FROM node:20-alpine AS development

WORKDIR /app

# Habilitar Corepack
RUN corepack enable

# Instalar dependências globais
RUN pnpm add -g @angular/cli

# Copiar arquivos de dependência
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências
RUN pnpm install

# Expor porta de desenvolvimento
EXPOSE 4200

# Comando padrão para desenvolvimento
CMD ["pnpm", "start", "--host", "0.0.0.0", "--port", "4200"]