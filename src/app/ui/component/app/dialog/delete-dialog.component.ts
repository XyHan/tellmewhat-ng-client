import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  private _dialogRef: MatDialogRef<DeleteDialogComponent>;
  public _deleteEvent: EventEmitter<boolean>;

  constructor(dialogRef: MatDialogRef<DeleteDialogComponent>) {
    this._dialogRef = dialogRef;
    this._deleteEvent = new EventEmitter(true);
  }

  get deleteEvent(): EventEmitter<boolean> {
    return this._deleteEvent;
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  onOkClick(): void {
    this._deleteEvent.emit();
    this._dialogRef.close();
  }
}
