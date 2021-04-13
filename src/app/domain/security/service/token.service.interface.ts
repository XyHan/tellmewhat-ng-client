import { TokenInterface } from '../model/token.model';
import { DecodedTokenInterface } from '../model/decoded-token.model';

export interface TokenServiceInterface {
  decode(token: TokenInterface): DecodedTokenInterface;
}
