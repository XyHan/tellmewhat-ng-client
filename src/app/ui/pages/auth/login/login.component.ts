import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../../../domain/security/service/auth.service.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly _loginForm: FormGroup;
  private readonly _authService: AuthServiceInterface;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(AuthService) authService: AuthServiceInterface,
  ) {
    this._loginForm = this.formBuilder.group({ email: ['', Validators.required], password: ['', Validators.required] });
    this._authService = authService;
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  async onSubmit(): Promise<void> {
    await this._authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
