import ClubModel from '../database/models/Club';
import { Club } from '../interfaces/Club';

class ClubServices {
  clubModel = ClubModel;

  async getAll():Promise<Club[]> {
    const data = await this.clubModel.findAll();
    return data;
  }

  async getById(id: number):Promise<Club | null> {
    const club = await this.clubModel.findByPk(id);
    return club;
  }
}

export default ClubServices;
