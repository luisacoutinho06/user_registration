import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { strongPasswordValidator } from '../../../validators/password.validator';

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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', strongPasswordValidator()],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.userId;

    if (this.isEditMode) {
      this.userService.getById(this.userId).subscribe((user: any) => {
        this.userForm.patchValue({
          name: user.name,
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

    const { name, email, username, password, confirmPassword } = this.userForm.value;

    if (this.isEditMode) {
      const updateData: any = { name, email, username };

      if (password || confirmPassword) {
        if (password === confirmPassword) {
          updateData.password = password;
          updateData.passwordConfirmed = confirmPassword; // enviar para backend
        } else {
          this.userForm.setErrors({ passwordMismatch: true });
          return;
        }
      }

      this.userService.update(this.userId!, updateData)
        .subscribe({
          next: () => this.router.navigate(['/users-list']),
          error: (err) => alert(err.error?.message || 'Erro ao atualizar usuário')
        });

    } else {
      if (!password || !confirmPassword || password !== confirmPassword) {
        this.userForm.setErrors({ passwordMismatch: true });
        return;
      }

      const createData = { name, email, username, password, passwordConfirmed: confirmPassword };

      this.userService.create(createData)
        .subscribe({
          next: () => this.router.navigate(['/users-list']),
          error: (err) => alert(err.error?.message || 'Erro ao cadastrar usuário')
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
