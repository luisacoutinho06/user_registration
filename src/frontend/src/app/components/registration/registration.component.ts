import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html'
})
export class registrationComponent {
  registrationForm;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { username, password } = this.registrationForm.value;
      this.authService.registration(username || '', password || '').subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);

          Swal.fire({
            icon: 'success',
            title: 'Login realizado!',
            text: 'Você será redirecionado...',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/users']);
          });
        },
        error: (err) => {
          const message = err.error?.message || 'Login falhou';

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            confirmButtonColor: '#0d6efd'
          });
        }
      });
    }
  }
}
