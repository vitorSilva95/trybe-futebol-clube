import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';

const { UNAUTHORIZED } = StatusCode;

const validatePassword = (req:Request, res:Response, next:NextFunction) => {
  const { password } = req.body as { password:string };

  if (!password) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  if (password.length <= 6) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }
  next();
};

const validateEmail = (req:Request, res:Response, next:NextFunction) => {
  const { email } = req.body as { email:string };
  const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email) {
    return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  if (!isValidEmail.test(email)) {
    return res.status(UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }

  next();
};

const validateLogin = [validateEmail, validatePassword];

export default validateLogin;
