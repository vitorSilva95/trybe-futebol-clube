import { IMatch } from '../interfaces/Match';
import MatchModel from '../database/models/Match';
import ClubModel from '../database/models/Club';
import ScoreBoard from '../interfaces/ScoreBoard';

class MatchServices {
  matchModel = MatchModel;

  clubModel = ClubModel;

  async getAll(inProgress:string | undefined) {
    if (inProgress) {
      return this.findByInProgress(JSON.parse(inProgress));
    }
    const data = await this.matchModel.findAll({
      include: [
        { model: this.clubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: this.clubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return data;
  }

  async findByInProgress(inProgress:boolean) {
    const data = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        { model: this.clubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: this.clubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return data;
  }

  async create(payload:IMatch) : Promise<IMatch> {
    const { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals, inProgress } = payload;
    const data = await this.matchModel.create({
      awayTeam,
      awayTeamGoals,
      homeTeam,
      homeTeamGoals,
      inProgress,
    }).then((result) => result.get({ plain: true }));

    return data;
  }

  async update(id:number) {
    const data = await this.matchModel.update({ inProgress: false }, {
      where: { id },
    });
    console.log(data);

    const matchInProgress = await this.matchModel.findOne({ where: { id }, raw: true });

    return matchInProgress;
  }

  async updatedScoreBoard(id:number, { homeTeamGoals, awayTeamGoals }:ScoreBoard) {
    await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });

    const matchWithUpdatedScore = await this.matchModel.findOne({ where: { id }, raw: true });

    return matchWithUpdatedScore;
  }
}

export default MatchServices;
