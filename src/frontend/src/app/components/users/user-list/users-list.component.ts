import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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
    1: 'Usuário Comum'
  };

  constructor(private userService: UserService, private router: Router) {}

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
    if(confirm('Deseja realmente excluir este usuário?')) {
      this.userService.delete(id).subscribe(() => this.loadUsers());
    }
  }
}
