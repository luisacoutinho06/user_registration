import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.component.html'
})
export class UsersListComponent {
  users: any[] = [];

  roleMap: { [key: number]: string } = {
    1: 'Usuário Comum',
    2: 'Administrador',
    3: 'Outro'
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe((res: any) => this.users = res);
  }

  editUser(id: number) {
    this.router.navigate([`/users/edit/${id}`]);
  }

  deleteUser(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) return;

    Swal.fire({
      title: 'Confirmar Exclusão',
      html: `
      <p>Deseja realmente excluir este usuário?</p>
      <table class="table table-sm table-bordered text-center mt-3" style="width: 100%; table-layout: fixed;">
        <thead class="table-light">
          <tr>
            <th style="width: 33%;">Nome</th>
            <th style="width: 33%;">Email</th>
            <th style="width: 34%;">Tipo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${this.roleMap[user.role] || 'Desconhecido'}</td>
          </tr>
        </tbody>
      </table>
    `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
      focusCancel: true,
      width: '600px',
      customClass: {
        popup: 'swal2-border-radius',
        htmlContainer: 'text-start'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(() => {
          Swal.fire('Deletado!', 'O usuário foi removido.', 'success');
          this.loadUsers();
        });
      }
    });
  }
}
