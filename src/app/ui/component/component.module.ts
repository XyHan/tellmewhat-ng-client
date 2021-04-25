import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/header/header.component';
import { AppRoutingModule } from '../../infrastructure/app/app-routing.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTicketModalComponent } from './ticket/modal/add-ticket/add-ticket-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddTicketModalComponent
  ],
  exports: [
    HeaderComponent,
    AddTicketModalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ]
})
export class ComponentModule { }
