export interface TokenInterface {
  token: string | undefined;
}

export class TokenModel implements TokenInterface {
  protected readonly _token: string | undefined;

  constructor(token?: string | undefined) {
    this._token = token;
  }

  get token(): string | undefined {
    return this._token;
  }

  public toString = (): string => {
    if (!this._token) {
      throw new TypeError('TokenModel - toString - Undefined token');
    }
    return this._token;
  }
}
