import { TokenInterface } from '../model/token.model';

export interface SecurityQueryRepositoryInterface {
  getToken(email: string, password: string): Promise<TokenInterface>;
}
