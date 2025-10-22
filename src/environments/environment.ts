export const environment = {
  production: false,
  development: true,
  staging: false,
  apiUrl: 'http://localhost:8001',
  oauth2: {
    issuer: 'http://localhost:8080/realms/cuidar',
    clientId: 'cuidar-web',
    redirectUri: 'http://localhost:4200/auth/callback',
    logoutUrl: 'http://localhost:4200/auth/logout',
    scope:
      'openid profile email patients:read patients:write inventory:read inventory:write pharmacy:read pharmacy:write reports:read users:read',
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
