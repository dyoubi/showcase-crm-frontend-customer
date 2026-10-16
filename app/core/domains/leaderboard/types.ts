import { MachineView } from '../machineView';
import { Player } from '../player';

export interface GetMachinesLeaderBoardResponse {
  id: string;
  name: string;
  casinoId: string;
  key: string;
  memberType: string;
  rankingType: string;
  from: number;
  to: number;
  positions: ReadonlyArray<{
    id: string;
    key: string;
    score: number;
    member: MachineView;
    position: number;
  }>;
}

export interface GetPlayersLeaderBoardResponse {
  id: string;
  name: string;
  casinoId: string;
  key: string;
  memberType: string;
  rankingType: string;
  from: number;
  to: number;
  positions: ReadonlyArray<{
    id: string;
    key: string;
    score: number;
    member: Player;
    position: number;
  }>;
}
