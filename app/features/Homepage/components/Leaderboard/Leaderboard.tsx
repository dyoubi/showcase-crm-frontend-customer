import { LeaderboardContainer } from './Leaderboard.styles';
import { LeaderboardRTP } from './parts/LeaderboardRTP';
import { LeaderboardPlayer } from './parts/LeaderboardPlayer';
import { LeaderboardCurrencies } from './parts/LeaderboardCurrencies';

export const Leaderboard = () => {
  return (
    <LeaderboardContainer>
      <LeaderboardRTP />
      <LeaderboardPlayer />
      <LeaderboardCurrencies />
    </LeaderboardContainer>
  );
};
