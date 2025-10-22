// Helper para acessar variáveis de ambiente
const getEnvVar = (key: string, defaultValue: string): string => {
  return (
    (globalThis as { process?: { env?: Record<string, string> } })?.process?.env?.[
      key
    ] || defaultValue
  );
};

export const environment = {
  production: false,
  development: false,
  staging: true,
  apiUrl: getEnvVar('VITE_API_URL', 'https://api-staging.cuidarplus.com'),
  oauth2: {
    issuer: getEnvVar(
      'VITE_OAUTH2_ISSUER',
      'https://auth-staging.cuidarplus.com/realms/cuidar'
    ),
    clientId: getEnvVar('VITE_OAUTH2_CLIENT_ID', 'cuidar-web-staging'),
    redirectUri: getEnvVar(
      'VITE_OAUTH2_REDIRECT_URI',
      'https://staging.cuidarplus.com/auth/callback'
    ),
    logoutUrl: getEnvVar(
      'VITE_OAUTH2_LOGOUT_URL',
      'https://staging.cuidarplus.com/auth/logout'
    ),
    scope: getEnvVar(
      'VITE_OAUTH2_SCOPE',
      'openid profile email patients:read patients:write inventory:read inventory:write pharmacy:read pharmacy:write reports:read users:read'
    ),
  },
  storage: {
    prefix: 'cuidar_staging_',
  },
  logging: {
    level: 'info',
    enableConsole: true,
  },
  features: {
    enableServiceWorker: true,
    enableAnalytics: false,
    enableErrorReporting: true,
    enablePerformanceMonitoring: true,
  },
};
