import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecurityQueryRepositoryInterface as BaseSecurityQueryRepositoryInterface } from '../../../domain/security/repository/security.query-repository.interface';
import { TokenInterface, TokenModel } from '../../../domain/security/model/token.model';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SecurityRepositoryException } from './security.repository.exception';

export interface SecurityQueryRepositoryInterface extends BaseSecurityQueryRepositoryInterface {
  getToken(email: string, password: string): Observable<TokenInterface> ;
}

@Injectable()
export class SecurityQueryRepository implements SecurityQueryRepositoryInterface {
  private readonly _clientHttp: HttpClient;

  constructor(@Inject(HttpClient) clientHttp: HttpClient) {
    this._clientHttp = clientHttp;
  }

  public getToken(email: string, password: string): Observable<TokenInterface> {
    return this._clientHttp
      .post<TokenInterface>('/api/login', { email, password })
      .pipe(
        map((token: TokenInterface)  => new TokenModel(token.token)),
        catchError((error) => { throw new SecurityRepositoryException(`SecurityQueryRepository - getToken - ${error.message}`); })
      );
  }
}
