import { Injectable } from '@angular/core';
import { TokenInterface } from '../../../../domain/security/model/token.model';
import { DecodedTokenInterface, DecodedTokenModel } from '../../../../domain/security/model/decoded-token.model';
import { TokenServiceInterface } from '../../../../domain/security/service/token.service.interface';
import { plainToClass } from 'class-transformer';
import { TokenServiceException } from './token.service.exception';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements TokenServiceInterface {
  public decode(token: TokenInterface): DecodedTokenInterface {
    try {
      const base64Token = token.token.split('.')[1];
      return plainToClass(DecodedTokenModel, atob(base64Token));
    } catch (e) {
      throw new TokenServiceException(`TokenService - decoded - error: ${e.message}`);
    }
  }

  public registerToken(token: TokenInterface): void {
    try {
      localStorage.setItem('id_token', 'tmwToken');
      localStorage.setItem('access_token', token.toString());
    } catch (e) {
      throw new TokenServiceException(`TokenService - registerToken - error: ${e.message}`);
    }
  }

  public removeToken(): void {
    try {
      localStorage.removeItem('id_token');
      localStorage.removeItem('access_token');
    } catch (e) {
      throw new TokenServiceException(`TokenService - registerToken - error: ${e.message}`);
    }
  }

  public getToken(token: TokenInterface): string | null {
    try {
      return localStorage.getItem('access_token');
    } catch (e) {
      throw new TokenServiceException(`TokenService - registerToken - error: ${e.message}`);
    }
  }

  public isValidToken(token: string): boolean {
    const base64Url = token.split('.');
    return !(base64Url.length < 2 || !base64Url[1]);
  }

  private isExpired(token: TokenInterface): boolean {
    const decodedToken: DecodedTokenInterface = this.decode(token);
    const timestampNow = Math.floor(new Date().getTime() / 1000);

    return !!(decodedToken.exp && (decodedToken.exp < timestampNow));
  }
}
