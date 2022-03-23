import { Request, Response, NextFunction } from 'express';
import ClubServices from '../services/ClubServices';
import StatusCode from '../enums/StatusCode';

const { UNAUTHORIZED } = StatusCode;
const clubServices = new ClubServices();
const validateEqualTeam = (req:Request, res:Response, next:NextFunction) => {
  const { awayTeam, homeTeam } = req.body;

  if (awayTeam === homeTeam) {
    return res.status(UNAUTHORIZED)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

const validateClubExists = async (req:Request, res:Response, next:NextFunction) => {
  const { awayTeam, homeTeam } = req.body;

  const awayTemExists = await clubServices.getById(awayTeam);
  const homeTeamExists = await clubServices.getById(homeTeam);

  if (!awayTemExists || !homeTeamExists) {
    return res.status(UNAUTHORIZED).json({ message: 'There is no team with such id!' });
  }

  next();
};

const validateMatch = [validateEqualTeam, validateClubExists];

export default validateMatch;
