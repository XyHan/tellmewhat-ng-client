import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../infrastructure/security/service/auth/auth.service';
import { AuthServiceInterface } from '../../../domain/security/service/auth.service.interface';
import { TokenService } from '../../../infrastructure/security/service/token/token.service';
import { TokenServiceInterface } from '../../../domain/security/service/token.service.interface';
import { TokenInterface } from '../../../domain/security/model/token.model';
import { DecodedTokenInterface } from '../../../domain/security/model/decoded-token.model';
import { UserService } from '../../../infrastructure/security/service/user/user.service';
import { UserServiceInterface } from '../../../domain/security/service/user.service.interface';
import { UserInterface, UserModel } from '../../../domain/security/model/user.model';

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
    @Inject(UserService) userService: UserServiceInterface,
  ) {
    this._title = 'Tell me what !';
    this._loginForm = this.formBuilder.group({ email: ['', Validators.required], password: ['', Validators.required] });
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
    const token: TokenInterface | null = await this._authService.login(this.loginForm.value.email, this.loginForm.value.password);
    if (token) {
      await this._tokenService.registerToken(token);
      const decodedToken: DecodedTokenInterface = this._tokenService.decode(token);
      const user: UserInterface = new UserModel({ email: decodedToken.email, uuid: decodedToken.uuid });
      console.log('user', user);
    }
  }
}
