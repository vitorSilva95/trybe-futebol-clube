import * as jwt from 'jsonwebtoken';
import FsSecretKey from './FsSecretKey';
import User from '../interfaces/User';

const generateToken = (payload:User) : string => {
  const secretKey = FsSecretKey();
  const token = jwt.sign(payload, secretKey, {
    algorithm: 'HS256',
    expiresIn: '60h',
  });
  return token;
};

export default generateToken;
