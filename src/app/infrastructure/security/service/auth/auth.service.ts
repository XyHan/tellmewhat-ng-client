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
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
    this._securityRepository.getToken(email, password).subscribe(
      async (token: TokenInterface) => {
        this._tokenService.registerToken(token);
        this._userService.setCurrentUser(token);
        await this._router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.error(`AuthService - login - ${error.message}`);
        return new AuthServiceException(`AuthService - login - user ${email} error: ${error.message}`);
      }
    );
  }

  public logout(): void {
    try {
      this._tokenService.removeToken();
    } catch (e) {
      throw new AuthServiceException(`AuthService - logout - error: ${e.message}`);
    }
  }

  public isAuthenticated(): boolean {
    try {
      const token: TokenInterface | null = this._tokenService.getToken();
      return !(!token || !this._tokenService.isExpired(token) || !this._tokenService.isValidToken(token));
    } catch (e) {
      throw new AuthServiceException(`AuthService - isAuthenticated - error: ${e.message}`);
    }
  }
}
