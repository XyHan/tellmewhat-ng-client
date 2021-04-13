export interface UserInterface {
  email: string | undefined;
  uuid: string | undefined;
}

export class UserModel implements  UserInterface {
  private _email: string | undefined;
  private _uuid: string | undefined;

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }

  get uuid(): string | undefined {
    return this._uuid;
  }

  set uuid(value: string | undefined) {
    this._uuid = value;
  }
}
