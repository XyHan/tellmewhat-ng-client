import { TokenInterface } from '../model/token.model';
import { UserInterface } from '../model/user.model';

export interface UserServiceInterface {
  setCurrentUser(token: TokenInterface): void;
  getCurrentUser(): UserInterface;
}
