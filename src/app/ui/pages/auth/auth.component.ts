import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  private readonly _title: string;
  private readonly _loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._title = 'Tell me what !';
    this._loginForm = this.formBuilder.group({ email: '', password: '' });
  }

  get title(): string {
    return this._title;
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  onSubmit(): void {
    console.log('EMAIL', this.loginForm.value.email);
    console.log('PASSWORD', this.loginForm.value.password);
  }
}
