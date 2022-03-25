import { ILeaderBoard } from '../../interfaces/ILeaderBoard';
import { IMatch } from '../../interfaces/IMatch';

class LeaderBoard implements ILeaderBoard {
  name:string;

  totalPoints: number;

  totalGames: number;

  totalVictories: number;

  totalDraws: number;

  totalLosses: number;

  goalsFavor: number;

  goalsOwn: number;

  goalsBalance: number;

  efficiency: number;

  constructor(name:string, public partidas:IMatch[]) {
    this.name = name;
    this.totalGames = partidas.length;
    this.totalVictories = this.resultGame().victorys;
    this.totalDraws = this.resultGame().draws;
    this.totalLosses = this.resultGame().defeats;
    this.totalPoints = this.score();
    this.goalsFavor = this.goals().totalGoalsFovor;
    this.goalsOwn = this.goals().totalGoalsOwnr;
    this.efficiency = this.winRate();
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  score():number {
    let total = 0;
    this.partidas.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        total += 3;
      }
      if (homeTeamGoals === awayTeamGoals) {
        total += 1;
      }
    });
    return total;
  }

  winRate():number {
    const efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100);
    return +efficiency.toFixed(2);
  }

  resultGame() {
    let victorys = 0;
    let defeats = 0;
    let draws = 0;
    this.partidas.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) {
        victorys += 1;
      }
      if (homeTeamGoals === awayTeamGoals) {
        draws += 1;
      }
      if (homeTeamGoals < awayTeamGoals) {
        defeats += 1;
      }
    });
    return { victorys, draws, defeats };
  }

  goals() {
    let totalGoalsFovor = 0;
    let totalGoalsOwnr = 0;
    this.partidas.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      totalGoalsFovor += homeTeamGoals;
      totalGoalsOwnr += awayTeamGoals;
    });
    return { totalGoalsFovor, totalGoalsOwnr };
  }

  returnData(): ILeaderBoard {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}

export default LeaderBoard;
