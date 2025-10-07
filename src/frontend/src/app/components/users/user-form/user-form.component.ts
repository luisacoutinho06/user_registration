import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  userForm;
  userId: number | null = null;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['']
    });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.userService.getById(this.userId).subscribe((user: any) => {
        this.userForm.patchValue(user);
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.userId) this.userService.update(this.userId, this.userForm.value)
        .subscribe(() => this.router.navigate(['/users']));
      else this.userService.create(this.userForm.value)
        .subscribe(() => this.router.navigate(['/users']));
    }
  }
}
