import { DecodedTokenInterface } from '../model/decoded-token.model';

export interface AuthServiceInterface {
  login(email: string, password: string): Promise<DecodedTokenInterface | null>;
}
