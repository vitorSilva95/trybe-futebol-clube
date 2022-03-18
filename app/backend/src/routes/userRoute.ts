import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController';
import validateLogin from '../middlewares/validateLogin';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', validateLogin, async (req: Request, res: Response) => {
  const { email } = req.body as { email:string };
  const result = await userController.login(email);
  res.status(200).json(result);
});

export default userRouter;
