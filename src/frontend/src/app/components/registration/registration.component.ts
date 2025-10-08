import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
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
  registrationForm: FormGroup;
  showPassword: boolean = false;
  showPasswordConfirmed: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      passwordConfirmed: ['', [Validators.required, strongPasswordValidator()]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('passwordConfirmed')?.value;
    return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmed() {
    this.showPasswordConfirmed = !this.showPasswordConfirmed;
  }

  onSubmit() {
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    if (this.registrationForm.hasError('passwordMismatch')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'As senhas não conferem!',
        confirmButtonColor: '#0d6efd'
      });
      return;
    }

    this.authService.registration(this.registrationForm.value).subscribe({
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
