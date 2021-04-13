import { UserServiceInterface } from '../../../../domain/security/service/user.service.interface';
import { UserInterface } from '../../../../domain/security/model/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService implements UserServiceInterface {
  private _user: UserInterface | undefined;

  get user(): UserInterface | undefined {
    return this._user;
  }

  set user(value: UserInterface | undefined) {
    this._user = value;
  }
}
