import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div class="card shadow-lg rounded-4 p-4 p-md-5" style="max-width: 900px;">
        <div class="row align-items-center">
          <div class="col-md-5 text-center text-md-start mb-4 mb-md-0">
            <img src="assets/error404.png" alt="Erro 404" class="img-fluid animate__animated animate__fadeInLeft"/>
          </div>
          <div class="col-md-7 text-center text-md-start">
            <h1 class="text-danger fw-bold mb-3 animate__animated animate__fadeInUp">Ops! Algo deu errado</h1>
            <p class="text-muted fs-5 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
              A página que você tentou acessar não existe ou você não tem permissão para vê-la.
            </p>

            <div class="d-flex justify-content-md-end justify-content-center">
              <a routerLink="/" class="btn btn-primary btn-lg shadow-sm">
                <i class="bi bi-house-door-fill me-2"></i> Página Inicial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background-color: #fff;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class ErrorComponent { }
