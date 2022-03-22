import ClubServices from '../services/ClubServices';
import { Club } from '../interfaces/Club';

class UserController {
  clubServices = new ClubServices();

  async getAll(): Promise<Club[]> {
    const data = await this.clubServices.getAll();
    return data;
  }

  async getById(id: number):Promise<Club | null> {
    const club = await this.clubServices.getById(id);
    return club;
  }
}

export default UserController;
