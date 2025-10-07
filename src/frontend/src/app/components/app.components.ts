import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Cadastro de Usuários';
  nomeUsuario: string | null = null;
  mostrarMenu = true; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.atualizarUsuario();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.atualizarUsuario();
      this.mostrarMenu = true;
    });
  }

  atualizarUsuario(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    this.nomeUsuario = usuario?.nome || null;
  }

  logout(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.nomeUsuario = null;
    this.router.navigate(['/login']);
  }

  get logado(): boolean {
    return !!this.nomeUsuario;
  }
}
