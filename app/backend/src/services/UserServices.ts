import generateToken from '../utils/generateToken';
import UserModel from '../database/models/User';
import Login from '../interfaces/Login';

class UserServices {
  userModel = UserModel;

  async login(email:string):Promise<Login | string> {
    const result = await this.userModel.findOne({ where: { email }, raw: true });
    if (!result) {
      return 'User does not exist';
    }
    const { password, ...user } = result;
    const token = generateToken(user);
    const payload = {
      user: result, token,
    };

    return payload;
  }
}

export default UserServices;
