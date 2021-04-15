import { Inject, Injectable } from '@angular/core';
import { SecurityQueryRepository } from '../../repository/security.query-repository';
import { SecurityQueryRepositoryInterface } from '../../../../domain/security/repository/security.query-repository.interface';
import { TokenInterface } from '../../../../domain/security/model/token.model';
import { AuthServiceInterface } from '../../../../domain/security/service/auth.service.interface';
import { AuthServiceException } from './auth.service.exception';
import { DecodedTokenModel } from '../../../../domain/security/model/decoded-token.model';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthServiceInterface {
  private readonly _securityRepository: SecurityQueryRepositoryInterface;

  constructor(@Inject(SecurityQueryRepository) securityRepository: SecurityQueryRepositoryInterface) {
    this._securityRepository = securityRepository;
  }

  public async login(email: string, password: string): Promise<TokenInterface | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const token: TokenInterface = await this._securityRepository.getToken(email, password);
        console.log('plainToClass(DecodedTokenModel, token.token)', plainToClass(DecodedTokenModel, token.token));
        token && token.token.length ? resolve(token) : resolve(null);
      } catch (e) {
        reject(new AuthServiceException(e.message));
      }
    });
  }
}
