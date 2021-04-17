import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/header/header.component';
import { AppRoutingModule } from '../../infrastructure/app-routing.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
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
