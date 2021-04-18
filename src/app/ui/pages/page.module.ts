import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { ComponentModule } from '../component/component.module';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    TicketComponent
  ],
  imports: [
    MaterialModule,
    ComponentModule,
    ReactiveFormsModule
  ],
})
export class PageModule { }
