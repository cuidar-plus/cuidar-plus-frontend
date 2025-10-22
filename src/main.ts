import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

// Configuração da aplicação
bootstrapApplication(AppComponent, {
  providers: [
    // Roteamento
    provideRouter(routes),

    // HTTP Client
    provideHttpClient(
      withInterceptors([
        // Interceptors serão adicionados aqui
      ])
    ),

    // Animações
    provideAnimationsAsync(),
    importProvidersFrom(BrowserAnimationsModule),

    // Configurações específicas do ambiente
    {
      provide: 'environment',
      useValue: environment,
    },
  ],
}).catch(err => console.error('Erro ao inicializar a aplicação:', err));
