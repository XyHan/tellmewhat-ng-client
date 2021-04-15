import { TokenInterface } from '../model/token.model';

export interface AuthServiceInterface {
  login(email: string, password: string): Promise<TokenInterface | null>;
}
