import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import UserController from '../controllers/userController';
import validateLogin from '../middlewares/validateLogin';
import StatusCode from '../enums/StatusCode';

const { OK } = StatusCode;

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', validateLogin, async (req: Request, res: Response) => {
  const { email, password } = req.body as { email:string, password:string };
  const data = await userController.login(email, password);

  res.status(data.status).json(data.response);
});

userRouter.get('/validate', authMiddleware, async (req: Request, res: Response) => {
  const { authorization } = req.headers as { authorization: string };
  const role = userController.validateToken(authorization);

  res.status(OK).send(role);
});

export default userRouter;
