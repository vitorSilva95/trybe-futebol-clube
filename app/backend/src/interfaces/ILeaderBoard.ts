import { IMatch } from './IMatch';

interface ILeaderBoard {
  name: string;
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  efficiency: number,
  goalsBalance: number
}

interface IClubMatchs {
  clubName:string,
  homeClub: IMatch[]
}

export { ILeaderBoard, IClubMatchs };
