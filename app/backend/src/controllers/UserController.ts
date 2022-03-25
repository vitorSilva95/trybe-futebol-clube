import UserServices from '../services/UserServices';
import { ILogin, IError } from '../interfaces/ILogin';

class UserController {
  userService = new UserServices();

  async login(email: string, bodyPassword:string): Promise<ILogin | IError> {
    const result = await this.userService.login(email, bodyPassword);
    return result;
  }

  validateToken(token:string): string {
    const role = this.userService.validateToken(token);
    return role;
  }
}

export default UserController;
