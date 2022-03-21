import { Router, Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import ClubController from '../controllers/ClubController';

const { OK } = StatusCode;

const clubsRoute = Router();
const clubController = new ClubController();

clubsRoute.get('/', async (req: Request, res: Response) => {
  const data = await clubController.getAll();
  return res.status(OK).json(data);
});

export default clubsRoute;
