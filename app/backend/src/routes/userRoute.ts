import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController';
import validateLogin from '../middlewares/validateLogin';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', validateLogin, async (req: Request, res: Response) => {
  const { email, password } = req.body as { email:string, password:string };
  const data = await userController.login(email, password);

  res.status(data.status).json(data.response);
});

export default userRouter;
