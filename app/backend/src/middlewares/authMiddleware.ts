import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import FsSecretKey from '../utils/FsSecretKey';
import StatusCode from '../enums/StatusCode';

const { UNAUTHORIZED } = StatusCode;

const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const { authorization } = req.headers;
  const secretKey = FsSecretKey() || 'super_senha';

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(authorization, secretKey);
    next();
  } catch (_) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

export default authMiddleware;
