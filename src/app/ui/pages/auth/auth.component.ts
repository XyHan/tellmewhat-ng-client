import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../../domain/security/service/auth.service.interface';
import { TokenService } from '../../../infrastructure/security/service/token/token.service';
import { TokenServiceInterface } from '../../../domain/security/service/token.service.interface';
import { DecodedTokenInterface } from '../../../domain/security/model/decoded-token.model';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  private readonly _title: string;
  private readonly _loginForm: FormGroup;
  private readonly _authService: AuthServiceInterface;
  private readonly _tokenService: TokenServiceInterface;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(AuthService) authService: AuthServiceInterface,
    @Inject(TokenService) tokenService: TokenServiceInterface,
  ) {
    this._title = 'Tell me what !';
    this._loginForm = this.formBuilder.group({ email: '', password: '' });
    this._authService = authService;
    this._tokenService = tokenService;
  }

  get title(): string {
    return this._title;
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  async onSubmit(): Promise<void> {
    console.log('EMAIL', this.loginForm.value.email);
    console.log('PASSWORD', this.loginForm.value.password);
    const toto: DecodedTokenInterface | null = await this._authService.login(this.loginForm.value.email, this.loginForm.value.password);
    console.log('TOTO', toto?.uuid);
  }
}
