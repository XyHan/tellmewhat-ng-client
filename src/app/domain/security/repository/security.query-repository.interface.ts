import { TokenInterface } from '../model/token.model';
import { UserInterface } from '../model/user.model';

export interface SecurityQueryRepositoryInterface {
  getToken(email: string, password: string): Promise<TokenInterface>;
  getUser(email: string, token: string): Promise<UserInterface>;
}
