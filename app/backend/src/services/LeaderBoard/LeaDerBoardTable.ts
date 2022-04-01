import { ILeaderBoard } from '../../interfaces/ILeaderBoard';

class LeaderBoardTable {
  constructor(
    private name:string,
    private away:ILeaderBoard,
    private home:ILeaderBoard,
  ) {
  }

  private winRate():number {
    const totalPoints = this.away.totalPoints + this.home.totalPoints;
    const totalGames = this.away.totalGames + this.home.totalGames;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100);
    return +efficiency.toFixed(2);
  }

  returnData() {
    return {
      name: this.name,
      totalPoints: this.away.totalPoints + this.home.totalPoints,
      totalGames: this.away.totalGames + this.home.totalGames,
      totalVictories: this.away.totalVictories + this.home.totalVictories,
      totalDraws: this.away.totalDraws + this.home.totalDraws,
      totalLosses: this.away.totalLosses + this.home.totalLosses,
      goalsFavor: this.away.goalsFavor + this.home.goalsFavor,
      goalsOwn: this.away.goalsOwn + this.home.goalsOwn,
      goalsBalance: this.away.goalsBalance + this.home.goalsBalance,
      efficiency: this.winRate(),
    };
  }
}

export default LeaderBoardTable;
