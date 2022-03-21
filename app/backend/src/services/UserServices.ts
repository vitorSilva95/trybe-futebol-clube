import * as jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken';
import UserModel from '../database/models/User';
import { Login, Error } from '../interfaces/Login';
import comparePassword from '../utils/comparePassword';
import StatusCode from '../enums/StatusCode';

const { OK, UNAUTHORIZED } = StatusCode;

class UserServices {
  userModel = UserModel;

  jwtDecode = jwt;

  async login(email:string, bodyPassword:string):Promise<Login | Error> {
    const data = await this.userModel.findOne({ where: { email }, raw: true });

    if (!data || !comparePassword(bodyPassword, data.password)) {
      return { status: UNAUTHORIZED, response: { message: 'All fields must be filled' } };
    }

    const { password, ...user } = data;
    const token = generateToken(user);
    const payload = {
      user, token,
    };

    return { status: OK, response: payload };
  }

  validateToken(token:string) : string {
    const role = this.jwtDecode.decode(token, { complete: true });
    return role?.payload.role;
  }
}

export default UserServices;
