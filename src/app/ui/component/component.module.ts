import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HeaderComponent } from './app/header/header.component';
import { AppRoutingModule } from '../../infrastructure/app/app-routing.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTicketModalComponent } from './ticket/modal/add-ticket/add-ticket-modal.component';
import { CommentComponent } from './ticket/comment/single/comment.component';
import { CommentListComponent } from './ticket/comment/list/comment-list.component';
import { CustomDatePipe } from '../pipe/custom-date.pipe';
import { SliceStringPipe } from '../pipe/slice-string.pipe';
import { DeleteDialogComponent } from './app/dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddTicketModalComponent,
    CommentListComponent,
    CommentComponent,
    CustomDatePipe,
    SliceStringPipe,
    DeleteDialogComponent
  ],
  exports: [
    HeaderComponent,
    AddTicketModalComponent,
    CommentListComponent,
    CommentComponent,
    CustomDatePipe,
    SliceStringPipe,
    DeleteDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
})
export class ComponentModule { }
