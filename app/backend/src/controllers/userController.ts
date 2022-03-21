import UserServices from '../services/UserServices';
import { Login, Error } from '../interfaces/Login';

class UserController {
  userService = new UserServices();

  async login(email: string, bodyPassword:string): Promise<Login | Error> {
    const result = await this.userService.login(email, bodyPassword);
    return result;
  }
}

export default UserController;
