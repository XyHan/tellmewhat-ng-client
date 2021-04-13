export interface DecodedTokenInterface {
  uuid: string | undefined;
  email: string | undefined;
  iat: string | undefined;
  exp: string | undefined;
}

export class DecodedTokenModel implements DecodedTokenInterface {
  protected _uuid: string | undefined;
  protected _email: string | undefined;
  protected _iat: string | undefined;
  protected _exp: string | undefined;

  constructor(attributes: { uuid?: string; email?: string; iat?: string; exp?: string }) {
    if (attributes.uuid) { this._uuid = attributes.uuid; }
    if (attributes.email) { this._email = attributes.email; }
    if (attributes.iat) { this._iat = attributes.iat; }
    if (attributes.exp) { this._exp = attributes.exp; }
  }

  get uuid(): string | undefined {
    return this._uuid;
  }

  set uuid(value: string | undefined) {
    this._uuid = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }

  get iat(): string | undefined {
    return this._iat;
  }

  set iat(value: string | undefined) {
    this._iat = value;
  }

  get exp(): string | undefined {
    return this._exp;
  }

  set exp(value: string | undefined) {
    this._exp = value;
  }
}
