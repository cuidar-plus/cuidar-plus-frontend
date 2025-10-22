import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  services: {
    database: boolean;
    cache: boolean;
    storage: boolean;
  };
}

export interface ApiConnectionResponse {
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class HealthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  checkHealth(): Observable<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>(`${this.apiUrl}/health/`);
  }

  checkApiConnection(): Observable<ApiConnectionResponse> {
    return this.http.get<ApiConnectionResponse>(
      `${this.apiUrl}/api/v1/usuarios/usuarios/`
    );
  }
}
