import * as jwt from 'jsonwebtoken';
import FsSecretKey from './FsSecretKey';
import { IUser } from '../interfaces/IUser';

const generateToken = (payload:IUser) : string => {
  const secretKey = FsSecretKey();
  const token = jwt.sign(payload, secretKey, {
    algorithm: 'HS256',
    expiresIn: '60h',
  });
  return token;
};

export default generateToken;
