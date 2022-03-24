import MatchServices from '../services/MatchServices';
import { IMatch } from '../interfaces/Match';
import Score from '../interfaces/Score';

class MatchController {
  matchServices = new MatchServices();

  async getAll(inProgress:string | undefined) {
    const matchs = await this.matchServices.getAll(inProgress);
    return matchs;
  }

  async create(payload:IMatch): Promise<IMatch> {
    const match = await this.matchServices.create(payload);
    return match;
  }

  async update(id:number) {
    const matchUpdate = await this.matchServices.update(id);
    return matchUpdate;
  }

  async updatedScore(id:number, { homeTeamGoals, awayTeamGoals } : Score) {
    const matchUpdateScore = await this.matchServices
      .updatedScore(id, { homeTeamGoals, awayTeamGoals });
    return matchUpdateScore;
  }
}

export default MatchController;
