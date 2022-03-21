import ClubServices from '../services/ClubServices';
import { Club } from '../interfaces/Club';

class UserController {
  clubServices = new ClubServices();

  async getAll(): Promise<Club[]> {
    const data = await this.clubServices.getAll();
    return data;
  }
}

export default UserController;
