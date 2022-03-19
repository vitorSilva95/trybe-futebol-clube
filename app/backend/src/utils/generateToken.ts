import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import User from '../interfaces/User';

const generateToken = (payload:User) : string => {
  const secretKey = fs.readFileSync('jwt.evaluation.key', 'utf-8');

  const token = jwt.sign(payload, secretKey, {
    algorithm: 'HS256',
    expiresIn: '60h',
  });
  return token;
};

export default generateToken;
