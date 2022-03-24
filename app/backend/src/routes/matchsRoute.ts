import { Router, Request, Response } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import MatchController from '../controllers/MatchController';
import StatusCode from '../enums/StatusCode';
import validateMatch from '../middlewares/validateMatch';

const { OK, CREATED } = StatusCode;

const matchsRoute = Router();
const matchController = new MatchController();

matchsRoute.get('/', async (req: Request, res: Response) => {
  const { inProgress } = req.query as { inProgress: string | undefined };
  const matchs = await matchController.getAll(inProgress);
  return res.status(OK).json(matchs);
});

matchsRoute.post('/', authMiddleware, validateMatch, async (req: Request, res: Response) => {
  const match = await matchController.create(req.body);
  return res.status(CREATED).json(match);
});

matchsRoute.patch('/:id/finish', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const matchUpdate = await matchController.update(+id);
  return res.status(OK).json(matchUpdate);
});

matchsRoute.patch('/:id', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const matchUpdateScore = await matchController
    .updatedScore(+id, { homeTeamGoals, awayTeamGoals });
  return res.status(OK).json(matchUpdateScore);
});

export default matchsRoute;
