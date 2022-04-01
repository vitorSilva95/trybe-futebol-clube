import LeaderBoardHome from './LeaderBoardHome';
import { IMatch } from '../../interfaces/IMatch';

class LeaderBoardAway extends LeaderBoardHome {
  constructor(public name:string, public matchs:IMatch[]) {
    super(name, matchs);
    this.goalsBalance = this.goalsOwn - this.goalsFavor;
    this.goalsFavor = this.goals().totalGoalsOwnr;
    this.goalsOwn = this.goals().totalGoalsFovor;
  }

  score():number {
    let total = 0;
    this.matchs.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (awayTeamGoals > homeTeamGoals) {
        total += 3;
      }
      if (homeTeamGoals === awayTeamGoals) {
        total += 1;
      }
    });
    return total;
  }

  resultGame() {
    let victorys = 0;
    let defeats = 0;
    let draws = 0;
    this.matchs.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (awayTeamGoals > homeTeamGoals) {
        victorys += 1;
      }
      if (homeTeamGoals === awayTeamGoals) {
        draws += 1;
      }
      if (awayTeamGoals < homeTeamGoals) {
        defeats += 1;
      }
    });
    return { victorys, draws, defeats };
  }
}

export default LeaderBoardAway;
