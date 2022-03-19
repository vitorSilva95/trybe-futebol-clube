import UserServices from '../services/UserServices';
import Login from '../interfaces/Login';

class UserController {
  userService = new UserServices();

  async login(email: string): Promise<Login | string> {
    const result = await this.userService.login(email);
    return result;
  }
}

export default UserController;
