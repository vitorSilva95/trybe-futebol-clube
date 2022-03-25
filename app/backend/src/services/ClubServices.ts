import ClubModel from '../database/models/Club';
import { IClub } from '../interfaces/IClub';

class ClubServices {
  clubModel = ClubModel;

  async getAll():Promise<IClub[]> {
    const data = await this.clubModel.findAll();
    return data;
  }

  async getById(id: number):Promise<IClub | null> {
    const club = await this.clubModel.findByPk(id);
    return club;
  }
}

export default ClubServices;
