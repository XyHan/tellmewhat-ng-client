import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityModule } from './security/security.module';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, SecurityModule],
  exports: [BrowserModule, BrowserAnimationsModule]
})
export class AppModule { }
