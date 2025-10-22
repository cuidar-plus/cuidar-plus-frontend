#!/bin/sh
set -e

# Substituir variáveis de ambiente na configuração do Nginx
if [ -n "$VITE_API_URL" ]; then
    echo "Configurando API URL: $VITE_API_URL"
    envsubst '$VITE_API_URL' < /etc/nginx/conf.d/default.conf > /tmp/default.conf
    mv /tmp/default.conf /etc/nginx/conf.d/default.conf
fi

# Substituir variáveis de ambiente no index.html se necessário
if [ -f /usr/share/nginx/html/index.html ]; then
    echo "Configurando variáveis de ambiente no index.html..."
    
    # Criar arquivo de configuração JavaScript com variáveis de ambiente
    cat > /usr/share/nginx/html/config.js << EOF
window.ENV = {
    VITE_API_URL: '${VITE_API_URL:-http://localhost:8000}',
    VITE_OAUTH2_ISSUER: '${VITE_OAUTH2_ISSUER:-http://localhost:8080/realms/cuidar}',
    VITE_OAUTH2_CLIENT_ID: '${VITE_OAUTH2_CLIENT_ID:-cuidar-web}',
    VITE_APP_ENVIRONMENT: '${VITE_APP_ENVIRONMENT:-production}'
};
EOF
    
    echo "Configuração concluída!"
fi

echo "Entrypoint executado com sucesso!"