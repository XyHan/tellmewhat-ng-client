import { Inject, Injectable } from '@angular/core';
import { SecurityQueryRepository } from '../../repository/security.query-repository';
import { SecurityQueryRepositoryInterface } from '../../../../domain/security/repository/security.query-repository.interface';
import { TokenInterface } from '../../../../domain/security/model/token.model';
import { AuthServiceInterface } from '../../../../domain/security/service/auth.service.interface';
import { AuthServiceException } from './auth.service.exception';
import { TokenServiceInterface } from '../../../../domain/security/service/token.service.interface';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {
  private readonly _securityRepository: SecurityQueryRepositoryInterface;
  private readonly _tokenService: TokenServiceInterface;

  constructor(
    @Inject(SecurityQueryRepository) securityRepository: SecurityQueryRepositoryInterface,
    @Inject(TokenService) tokenService: TokenServiceInterface,
  ) {
    this._securityRepository = securityRepository;
    this._tokenService = tokenService;
  }

  public async login(email: string, password: string): Promise<TokenInterface | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const token: TokenInterface = await this._securityRepository.getToken(email, password);
        token && token.token.length ? resolve(token) : resolve(null);
      } catch (e) {
        reject(new AuthServiceException(`AuthService - login - user ${email} error: ${e.message}`));
      }
    });
  }

  public async logout(): Promise<void> {
    try {
      this._tokenService.removeToken();
    } catch (e) {
      throw new AuthServiceException(`AuthService - logout - error: ${e.message}`);
    }
  }
}
