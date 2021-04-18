import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input('errorMessage') private _message: string;

  constructor() {
    this._message = '';
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
