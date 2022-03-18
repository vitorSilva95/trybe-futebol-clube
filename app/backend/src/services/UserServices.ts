import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/User';

const secretKey = fs.readFileSync('jwt.evaluation.key', 'utf-8');

class UserServices {
  userModel = UserModel;

  jwtSecret = secretKey;

  async login(email:string):Promise<string> {
    const result = await this.userModel.findOne({ where: { email } });

    if (!result) {
      return 'nao foi possivel';
    }
    const token = jwt.sign({ email }, this.jwtSecret, {
      algorithm: 'HS256',
      expiresIn: '60h',
    });
    return token;
  }
}

export default UserServices;
