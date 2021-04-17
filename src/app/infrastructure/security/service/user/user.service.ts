import { UserServiceInterface } from '../../../../domain/security/service/user.service.interface';
import { UserInterface, UserModel } from '../../../../domain/security/model/user.model';
import { Inject, Injectable } from '@angular/core';
import { TokenInterface } from '../../../../domain/security/model/token.model';
import { TokenServiceInterface } from '../../../../domain/security/service/token.service.interface';
import { TokenService } from '../token/token.service';
import { DecodedTokenInterface } from '../../../../domain/security/model/decoded-token.model';
import { UserServiceException } from './user.service.exception';

@Injectable()
export class UserService implements UserServiceInterface {
  private readonly _tokenService: TokenServiceInterface;

  constructor(@Inject(TokenService) tokenService: TokenServiceInterface) {
    this._tokenService = tokenService;
  }

  public setCurrentUser(token: TokenInterface): void {
    const decodedToken: DecodedTokenInterface = this._tokenService.decode(token);
    const user: UserInterface = new UserModel({ email: decodedToken.email, uuid: decodedToken.uuid });
    Reflect.defineMetadata('currentUser', user, UserService);
  }

  public getCurrentUser(): UserInterface {
    const user: UserInterface | undefined = Reflect.getMetadata('currentUser', UserService);
    if (!user) { throw new UserServiceException('UserService - getCurrentUser - Current user is undefined'); }
    return user;
  }
}
