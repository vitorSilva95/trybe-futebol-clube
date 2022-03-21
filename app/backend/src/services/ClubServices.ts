import ClubModel from '../database/models/Club';
import { Club } from '../interfaces/Club';

class ClubServices {
  clubModel = ClubModel;

  async getAll():Promise<Club[]> {
    const data = await this.clubModel.findAll();
    return data;
  }
}

export default ClubServices;
