import { Request, Response, NextFunction } from 'express';

const validatePassword = (req:Request, res:Response, next:NextFunction) => {
  const { password } = req.body as { password:string };

  if (!password) {
    return res.status(400).json({ message: 'inform the password' });
  }
  if (password.length <= 6) {
    return res.status(400).json({ message: 'password length must be greater than 6' });
  }
  next();
};

const validateEmail = (req:Request, res:Response, next:NextFunction) => {
  const { email } = req.body as { email:string };
  const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email) {
    return res.status(400).json({ message: 'inform the email' });
  }
  if (!isValidEmail.test(email)) {
    return res.status(400).json({ message: 'email is invalid' });
  }

  next();
};

const validateLogin = [validateEmail, validatePassword];

export default validateLogin;
