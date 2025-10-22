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
  development: true,
  staging: false,
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:8000'),
  oauth2: {
    issuer: getEnvVar('VITE_OAUTH2_ISSUER', 'http://localhost:8080/realms/cuidar'),
    clientId: getEnvVar('VITE_OAUTH2_CLIENT_ID', 'cuidar-web'),
    redirectUri: getEnvVar(
      'VITE_OAUTH2_REDIRECT_URI',
      'http://localhost:4200/auth/callback'
    ),
    logoutUrl: getEnvVar('VITE_OAUTH2_LOGOUT_URL', 'http://localhost:4200/auth/logout'),
    scope: getEnvVar(
      'VITE_OAUTH2_SCOPE',
      'openid profile email patients:read patients:write inventory:read inventory:write pharmacy:read pharmacy:write reports:read users:read'
    ),
  },
  storage: {
    prefix: 'cuidar_dev_',
  },
  logging: {
    level: 'debug',
    enableConsole: true,
  },
  features: {
    enableServiceWorker: false,
    enableAnalytics: false,
    enableErrorReporting: true,
    enablePerformanceMonitoring: false,
  },
};
