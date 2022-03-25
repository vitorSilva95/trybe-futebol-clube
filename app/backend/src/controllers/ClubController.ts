import ClubServices from '../services/ClubServices';
import { IClub } from '../interfaces/IClub';

class UserController {
  clubServices = new ClubServices();

  async getAll(): Promise<IClub[]> {
    const data = await this.clubServices.getAll();
    return data;
  }

  async getById(id: number):Promise<IClub | null> {
    const club = await this.clubServices.getById(id);
    return club;
  }
}

export default UserController;
