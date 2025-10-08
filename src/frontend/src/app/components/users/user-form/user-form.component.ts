import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.services';
import { strongPasswordValidator } from '../../../validators/password.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  userForm;
  userId: number | null = null;
  isEditMode = false;

  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(8)]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      confirmPassword: ['', [Validators.required, strongPasswordValidator()]]
    }, { validators: this.passwordMatchValidator });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.userId;

    if (this.isEditMode) {
      this.userForm = this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
        username: ['', [Validators.required, Validators.maxLength(30)]],
        password: [''],
        confirmPassword: ['']
      }, { validators: this.passwordMatchValidator });


      this.userService.getById(this.userId).subscribe((user: any) => {
        this.userForm.patchValue({
          email: user.email,
          username: user.username
        });
      });
    }
  }

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (password || confirm) {
      return password === confirm ? null : { passwordMismatch: true };
    }
    return null;
  }

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirmPassword() { this.showConfirmPassword = !this.showConfirmPassword; }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const { email, username, password, confirmPassword } = this.userForm.value;

    if (this.isEditMode) {
      const updateData: any = { username, email };

      if (password || confirmPassword) {
        if (password === confirmPassword) {
          updateData.password = password;
          updateData.passwordConfirmed = confirmPassword;
        } else {
          this.userForm.setErrors({ passwordMismatch: true });
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'As senhas não coincidem!'
          });
          return;
        }
      }

      this.userService.update(this.userId!, updateData)
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Usuário atualizado com sucesso!'
            }).then(() => this.router.navigate(['/users-list']));
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: err.error?.message || 'Erro ao atualizar usuário'
            });
          }
        });

    } else {
      if (!password || !confirmPassword || password !== confirmPassword) {
        this.userForm.setErrors({ passwordMismatch: true });
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'As senhas não coincidem!'
        });
        return;
      }

      const createData = { username, email, password, passwordConfirmed: confirmPassword };

      this.authService.registration(createData)
        .subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Usuário cadastrado com sucesso!'
            }).then(() => this.router.navigate(['/users-list']));
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: err.error?.message || 'Erro ao cadastrar usuário'
            });
          }
        });
    }
  }


  hasError(controlName: string, error: string) {
    const control = this.userForm.get(controlName);
    return control?.touched && control.hasError(error);
  }

  hasFormError(error: string) {
    return this.userForm.touched && this.userForm.hasError(error);
  }
}
