import MatchModel from '../database/models/Match';
import ClubModel from '../database/models/Club';

class MatchServices {
  matchModel = MatchModel;

  clubModel = ClubModel;

  async getAll() {
    const data = await this.matchModel.findAll({
      include: [
        { model: this.clubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: this.clubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return data;
  }
}

export default MatchServices;
