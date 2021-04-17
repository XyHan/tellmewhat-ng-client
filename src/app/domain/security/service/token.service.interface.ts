import { TokenInterface } from '../model/token.model';
import { DecodedTokenInterface } from '../model/decoded-token.model';

export interface TokenServiceInterface {
  decode(token: TokenInterface): DecodedTokenInterface;
  registerToken(token: TokenInterface): void;
  removeToken(): void;
  getToken(): TokenInterface | null;
  isValidToken(token: TokenInterface): boolean;
  isExpired(token: TokenInterface): boolean;
}
