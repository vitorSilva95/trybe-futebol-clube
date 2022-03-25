import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import LeaderBoardServices from '../services/LeaderBoardServices';

class LeaderBoardController {
  leaderBoardServices = new LeaderBoardServices();

  async getAllHomeClub(): Promise<ILeaderBoard[]> {
    const data = await this.leaderBoardServices.getAllHomeClub();
    return data;
  }
}

export default LeaderBoardController;
