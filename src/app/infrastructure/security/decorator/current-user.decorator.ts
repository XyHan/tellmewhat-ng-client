import { UserService } from '../service/user/user.service';
import { UserInterface } from '../../../domain/security/model/user.model';
import { UserServiceException } from '../service/user/user.service.exception';

export const currentUser = () => {
  const user: UserInterface | undefined = Reflect.getMetadata('currentUser', UserService);
  if (!user) { throw new UserServiceException('Current user is undefined'); }
  return user;
};
