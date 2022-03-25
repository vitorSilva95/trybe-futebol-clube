import MatchModel from '../database/models/Match';
import ClubModel from '../database/models/Club';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import { IClub } from '../interfaces/IClub';
import sortTiebreaker from '../utils/sortTieBreaker';

class LeaderBoardServices {
  matchModel = MatchModel;

  clubModel = ClubModel;

  async getAllHomeClub():Promise<ILeaderBoard[]> {
    const finishedMatches:IClub[] = await this.clubModel.findAll({
      include: [
        { model: this.matchModel, as: 'homeClub', where: { inProgress: false } },
      ],
    });

    const leaderBoard:ILeaderBoard[] = finishedMatches.map(({ clubName, homeClub }) => {
      const leaderBoardRow = new LeaderBoard(clubName, homeClub).returnData();
      return leaderBoardRow;
    });

    return sortTiebreaker(leaderBoard);
  }
}

export default LeaderBoardServices;
