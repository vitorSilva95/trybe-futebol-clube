import UserServices from '../services/UserServices';

class UserController {
  userService = new UserServices();

  async login(email: string): Promise<string> {
    const result = await this.userService.login(email);
    return result;
  }
}

export default UserController;
