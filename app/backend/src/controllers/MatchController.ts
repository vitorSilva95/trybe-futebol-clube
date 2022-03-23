import MatchServices from '../services/MatchServices';
import { IMatch } from '../interfaces/Match';

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
}

export default MatchController;
