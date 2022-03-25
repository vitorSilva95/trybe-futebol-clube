import { ILeaderBoard } from '../interfaces/ILeaderBoard';

const sortTiebreaker = (leaderBoard: ILeaderBoard[]) => {
  const sortedLeaderBoard = leaderBoard.sort((club1, club2) => club2.goalsOwn - club1.goalsOwn)
    .sort((club1, club2) => club2.goalsFavor - club1.goalsFavor)
    .sort((club1, club2) => club2.goalsBalance - club1.goalsBalance)
    .sort((club1, club2) => club2.totalPoints - club1.totalPoints);
  return sortedLeaderBoard;
};

export default sortTiebreaker;
