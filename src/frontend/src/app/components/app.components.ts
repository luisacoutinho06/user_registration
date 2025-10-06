import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Cadastro de Usuários';
  nomeUsuario: string | null = null;
  temAcesso: boolean = false;
  logado: boolean = false;

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

    if (usuario && usuario.nome) {
      this.logado = true;
      this.nomeUsuario = usuario.nome;
      this.temAcesso = usuario.role === 1;
    } else {
      this.logado = false;
      this.nomeUsuario = null;
      this.temAcesso = false;
    }
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.logado = false;
    window.location.href = '/login';
  }
}
