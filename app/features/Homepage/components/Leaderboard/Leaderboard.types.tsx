export enum LeaderboardType {
  RTP = 'RTP',
  Player = 'Player',
}

export type BoardProps = {
  switchBoard?: (arg0: LeaderboardType) => void;
};
