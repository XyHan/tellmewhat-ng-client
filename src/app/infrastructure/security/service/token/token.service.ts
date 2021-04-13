import { Injectable } from '@angular/core';
import { TokenInterface } from '../../../../domain/security/model/token.model';
import { DecodedTokenInterface, DecodedTokenModel } from '../../../../domain/security/model/decoded-token.model';
import { TokenServiceInterface } from '../../../../domain/security/service/token.service.interface';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements TokenServiceInterface {
  public decode(token: TokenInterface): DecodedTokenInterface {
    const base64Token = token.token.split('.')[1];
    return plainToClass(DecodedTokenModel, atob(base64Token));
  }

  public registerToken(token: TokenInterface): void {
    localStorage.setItem('id_token', 'tmwToken');
    localStorage.setItem('access_token', token.toString());
  }
}
