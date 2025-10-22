import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Bem-vindo ao sistema Cuidar+</p>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-icon">👥</div>
          <div class="card-content">
            <h3>Pacientes</h3>
            <p class="card-number">0</p>
            <p class="card-subtitle">Pacientes cadastrados</p>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">💊</div>
          <div class="card-content">
            <h3>Medicamentos</h3>
            <p class="card-number">0</p>
            <p class="card-subtitle">Itens em estoque</p>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">👨‍⚕️</div>
          <div class="card-content">
            <h3>Profissionais</h3>
            <p class="card-number">0</p>
            <p class="card-subtitle">Usuários ativos</p>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">📊</div>
          <div class="card-content">
            <h3>Relatórios</h3>
            <p class="card-number">0</p>
            <p class="card-subtitle">Gerados este mês</p>
          </div>
        </div>
      </div>

      <div class="status-message">
        <div class="alert alert-info">
          <h4>🚧 Sistema em desenvolvimento</h4>
          <p>
            Esta é uma versão inicial do sistema. As funcionalidades estão sendo
            implementadas gradualmente.
          </p>
        </div>

        <div
          class="api-status"
          [class]="
            'alert alert-' +
            (connectionStatus() === 'connected'
              ? 'success'
              : connectionStatus() === 'error'
                ? 'danger'
                : 'warning')
          "
        >
          <h4>
            @if (connectionStatus() === 'checking') {
              ⏳ Verificando conexão com API...
            } @else if (connectionStatus() === 'connected') {
              ✅ API conectada com sucesso
            } @else {
              ❌ Erro na conexão com API
            }
          </h4>
          <p>
            @if (connectionStatus() === 'connected') {
              Backend Django respondendo na porta 8001
            } @else if (connectionStatus() === 'error') {
              Verifique se o backend está rodando em {{ environment.apiUrl }}
            } @else {
              Testando endpoint /health/...
            }
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .dashboard-header {
        margin-bottom: 2rem;
      }

      .dashboard-header h1 {
        color: #2c3e50;
        font-size: 2rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
      }

      .dashboard-header p {
        color: #64748b;
        margin: 0;
      }

      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }

      .dashboard-card {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;
        transition:
          transform 0.2s,
          box-shadow 0.2s;
      }

      .dashboard-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .card-icon {
        font-size: 2.5rem;
        width: 60px;
        text-align: center;
      }

      .card-content {
        flex: 1;
      }

      .card-content h3 {
        color: #2c3e50;
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 0.25rem 0;
      }

      .card-number {
        color: #4a90e2;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.25rem 0;
      }

      .card-subtitle {
        color: #64748b;
        font-size: 0.875rem;
        margin: 0;
      }

      .status-message {
        margin-top: 2rem;
      }

      .alert {
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border-left: 4px solid;
      }

      .alert-info {
        background: #f0f9ff;
        border-color: #4a90e2;
        color: #0369a1;
      }

      .alert h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        font-weight: 600;
      }

      .alert p {
        margin: 0;
        font-size: 0.875rem;
      }

      .alert-success {
        background: #f0f9ff;
        border-color: #00b894;
        color: #0369a1;
      }

      .alert-danger {
        background: #fef2f2;
        border-color: #e57373;
        color: #dc2626;
      }

      .alert-warning {
        background: #fffbeb;
        border-color: #f5a623;
        color: #d97706;
      }

      .api-status {
        margin-top: 1rem;
      }

      @media (max-width: 768px) {
        .dashboard-grid {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .dashboard-card {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  private readonly http = inject(HttpClient);

  public connectionStatus = signal<'checking' | 'connected' | 'error'>('checking');
  public environment = environment;

  ngOnInit() {
    this.checkApiConnection();
  }

  private checkApiConnection() {
    // Teste simples de conexão com a API usando endpoint admin
    this.http
      .get(`${environment.apiUrl}/admin/`, {
        responseType: 'text',
        observe: 'response',
      })
      .subscribe({
        next: _response => {
          // Se chegou até aqui, a API está respondendo (mesmo que seja 302)
          this.connectionStatus.set('connected');
        },
        error: error => {
          // Verifica se é um erro de rede ou se a API está respondendo
          if (error.status === 0) {
            // Erro de rede - API não está acessível
            this.connectionStatus.set('error');
          } else {
            // API está respondendo (mesmo com erro HTTP)
            this.connectionStatus.set('connected');
          }
        },
      });
  }
}
