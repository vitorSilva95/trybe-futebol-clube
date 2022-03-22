import { Router, Request, Response } from 'express';
import MatchController from '../controllers/MatchController';
import StatusCode from '../enums/StatusCode';

const { OK } = StatusCode;

const matchsRoute = Router();
const matchController = new MatchController();

matchsRoute.get('/', async (req: Request, res: Response) => {
  const matchs = await matchController.getAll();
  return res.status(OK).json(matchs);
});

export default matchsRoute;
