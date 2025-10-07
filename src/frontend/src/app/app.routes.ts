import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/users/user-list/users-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'users-list', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'users/new', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

