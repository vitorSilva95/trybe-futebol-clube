import { IMatch } from './IMatch';

export interface IClub {
  id:number,
  clubName: string,
  homeClub?:IMatch[] | any;
}
