import { Routes } from '@angular/router';
import { AuthComponent } from '../../ui/pages/auth/auth.component';

export const securityRouting: Routes = [
  { path: 'login', component: AuthComponent },
];
