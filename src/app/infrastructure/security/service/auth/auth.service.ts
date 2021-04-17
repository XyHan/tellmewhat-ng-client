import { Inject, Injectable } from '@angular/core';
import { SecurityQueryRepository } from '../../repository/security.query-repository';
import { SecurityQueryRepositoryInterface } from '../../../../domain/security/repository/security.query-repository.interface';
import { TokenInterface } from '../../../../domain/security/model/token.model';
import { AuthServiceInterface } from '../../../../domain/security/service/auth.service.interface';
import { AuthServiceException } from './auth.service.exception';
import { TokenServiceInterface } from '../../../../domain/security/service/token.service.interface';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { UserServiceInterface } from '../../../../domain/security/service/user.service.interface';
import { DecodedTokenInterface } from '../../../../domain/security/model/decoded-token.model';
import { UserInterface, UserModel } from '../../../../domain/security/model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {
  private readonly _securityRepository: SecurityQueryRepositoryInterface;
  private readonly _tokenService: TokenServiceInterface;
  private readonly _userService: UserServiceInterface;
  private readonly _router: Router;

  constructor(
    @Inject(SecurityQueryRepository) securityRepository: SecurityQueryRepositoryInterface,
    @Inject(TokenService) tokenService: TokenServiceInterface,
    @Inject(UserService) userService: UserServiceInterface,
    @Inject(Router) router: Router,
  ) {
    this._securityRepository = securityRepository;
    this._tokenService = tokenService;
    this._userService = userService;
    this._router = router;
  }

  public async login(email: string, password: string): Promise<void> {
    try {
      const token: TokenInterface = await this._securityRepository.getToken(email, password);
      await this._tokenService.registerToken(token);
      const decodedToken: DecodedTokenInterface = this._tokenService.decode(token);
      const user: UserInterface = new UserModel({ email: decodedToken.email, uuid: decodedToken.uuid });
      console.log('user', user);
      await this._router.navigate(['/']);
    } catch (e) {
      throw new AuthServiceException(`AuthService - login - user ${email} error: ${e.message}`);
    }
  }

  public async logout(): Promise<void> {
    try {
      this._tokenService.removeToken();
      await this._router.navigate(['/login']);
    } catch (e) {
      throw new AuthServiceException(`AuthService - logout - error: ${e.message}`);
    }
  }
}
