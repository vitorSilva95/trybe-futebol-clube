import { Router, Request, Response } from 'express';
import StatusCode from '../enums/StatusCode';
import LeaderBoardController from '../controllers/LeaderBoardController';

const { OK } = StatusCode;

const leaderBoard = Router();
const leaderBoardController = new LeaderBoardController();

leaderBoard.get('/home', async (_req: Request, res: Response) => {
  const data = await leaderBoardController.getAllHomeClub();
  return res.status(OK).json(data);
});

export default leaderBoard;
