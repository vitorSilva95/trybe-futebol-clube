import generateToken from '../utils/generateToken';
import UserModel from '../database/models/User';
import { Login, Error } from '../interfaces/Login';
import comparePassword from '../utils/comparePassword';
import StatusCode from '../enums/StatusCode';

const { OK, UNAUTHORIZED } = StatusCode;

class UserServices {
  userModel = UserModel;

  async login(email:string, bodyPassword:string):Promise<Login | Error> {
    const data = await this.userModel.findOne({ where: { email }, raw: true });
    console.log(data);

    if (!data || !comparePassword(bodyPassword, data.password)) {
      return { status: UNAUTHORIZED, response: { message: 'All fields must be filled' } };
    }

    const { password, ...user } = data;
    console.log(user);
    const token = generateToken(user);
    const payload = {
      user, token,
    };

    return { status: OK, response: payload };
  }
}

export default UserServices;
