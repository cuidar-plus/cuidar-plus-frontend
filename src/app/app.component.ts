import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-container">
      <!-- Header temporário -->
      <header class="app-header">
        <div class="header-content">
          <div class="logo">
            <h1>Cuidar+</h1>
            <span class="beta">Beta</span>
          </div>
          <nav class="main-nav">
            <a routerLink="/dashboard" class="nav-link">Dashboard</a>
            <a routerLink="/pacientes" class="nav-link">Pacientes</a>
            <a routerLink="/farmacia" class="nav-link">Farmácia</a>
            <a routerLink="/usuarios" class="nav-link">Usuários</a>
            <a routerLink="/relatorios" class="nav-link">Relatórios</a>
          </nav>
        </div>
      </header>

      <!-- Conteúdo principal -->
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .app-header {
        background: linear-gradient(
          135deg,
          var(--color-primary, #4a90e2) 0%,
          #357abd 100%
        );
        color: white;
        padding: 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .logo h1 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .beta {
        background: rgba(255, 255, 255, 0.2);
        padding: 0.125rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .main-nav {
        display: flex;
        gap: 2rem;
      }

      .nav-link {
        color: white;
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: background-color 0.2s;
      }

      .nav-link:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .app-main {
        flex: 1;
        background: #f8fafc;
        padding: 2rem;
      }

      @media (max-width: 768px) {
        .header-content {
          flex-direction: column;
          gap: 1rem;
        }

        .main-nav {
          flex-wrap: wrap;
          gap: 1rem;
        }

        .app-main {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'Cuidar+ | Sistema de Gestão Home Care';
}
