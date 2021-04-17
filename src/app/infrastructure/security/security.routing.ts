import { Routes } from '@angular/router';
import { LoginComponent } from '../../ui/pages/auth/login/login.component';
import { LogoutComponent } from '../../ui/pages/auth/logout/logout.component';

export const securityRouting: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
];
