import MatchModel from '../database/models/Match';
import ClubModel from '../database/models/Club';
import LeaderBoardHome from './LeaderBoard/LeaderBoardHome';
import { ILeaderBoard } from '../interfaces/ILeaderBoard';
import { IClub } from '../interfaces/IClub';
import sortTiebreaker from '../utils/sortTieBreaker';
import LeaderBoardAway from './LeaderBoard/LeaderBoardAway';
import LeaderBoardTable from './LeaderBoard/LeaDerBoardTable';

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
      const leaderBoardRow = new LeaderBoardHome(clubName, homeClub).returnData();
      return leaderBoardRow;
    });

    return sortTiebreaker(leaderBoard);
  }

  async getAllAwayClub():Promise<ILeaderBoard[]> {
    const finishedMatches:IClub[] = await this.clubModel.findAll({
      include: [
        { model: this.matchModel, as: 'awayClub', where: { inProgress: false } },
      ],
    });

    console.log(finishedMatches);

    const leaderBoard:ILeaderBoard[] = finishedMatches.map(({ clubName, awayClub }) => {
      const leaderBoardRow = new LeaderBoardAway(clubName, awayClub).returnData();
      return leaderBoardRow;
    });

    return sortTiebreaker(leaderBoard);
  }

  async getAllClubs():Promise<ILeaderBoard[]> {
    const finishedMatches:IClub[] = await this.clubModel.findAll({
      include: [
        { model: this.matchModel, as: 'awayClub', where: { inProgress: false } },
        { model: this.matchModel, as: 'homeClub', where: { inProgress: false } },
      ],
    });

    const leaderBoard = finishedMatches.map(({ clubName, awayClub, homeClub }) => {
      const away = new LeaderBoardAway(clubName, awayClub).returnData();
      const home = new LeaderBoardHome(clubName, homeClub).returnData();
      return new LeaderBoardTable(clubName, away, home).returnData();
    });

    return sortTiebreaker(leaderBoard);
  }
}

export default LeaderBoardServices;
