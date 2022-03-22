import MatchServices from '../services/MatchServices';

class MatchController {
  matchServices = new MatchServices();

  async getAll() {
    const matchs = await this.matchServices.getAll();
    return matchs;
  }
}

export default MatchController;
