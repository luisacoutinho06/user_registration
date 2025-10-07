import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { CommonModule } from '@angular/common';
import { strongPasswordValidator } from '../../validators/password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  registrationForm;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      passwordConfirmed: ['', Validators.required]
    });

  }

  showPassword: boolean = false;
  showPasswordConfirmed: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmed() {
    this.showPasswordConfirmed = !this.showPasswordConfirmed;
  }


  onSubmit() {
    if (this.registrationForm.valid) {
      const { username, email, password, passwordConfirmed } = this.registrationForm.value;

      if (password !== passwordConfirmed) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'As senhas não conferem!',
          confirmButtonColor: '#0d6efd'
        });
        return;
      }

      this.authService.registration(username || '', email || '', password || '', passwordConfirmed || '').subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);

          Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado!',
            text: 'Você será redirecionado...',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/']);
          });
        },
        error: (err) => {
          const message = err.error?.message || 'Falha no cadastro';
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
