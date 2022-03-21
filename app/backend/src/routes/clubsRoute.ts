import { Router, Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';

const { OK } = StatusCode;

const clubsRoute = Router();

clubsRoute.get('/', (req: Request, res: Response) => {
  const messageOK = { message: 'ROTA CLUBS OK' };
  return res.status(OK).json(messageOK);
});

export default clubsRoute;
