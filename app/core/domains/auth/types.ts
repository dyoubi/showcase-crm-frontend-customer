import { InGameFiatCodes } from '../currency';
import { Tag } from '../tag';

export interface MachineView {
  id: string;
  key: string;
  activate: boolean;
  title: string;
  description: string;
  casinoId: string;
  provider?: string;
  operatorId: string;
  tags?: ReadonlyArray<Tag>;
  image?: {
    desktop?: {
      url?: string;
    };
    mobile?: {
      url?: string;
    };
  };
}

export enum GameMode {
  Real = 'real',
  Fun = 'fun',
}

export interface MachineViewState {
  inGame: boolean;
  mode?: GameMode | null;
}

export interface PostPlayMachineViewPayload {
  game: string;
  balance: string;
  display: InGameFiatCodes;
  locale: string;
  clientType: 'desktop' | 'mobile';
  demo: boolean;
}

export interface PostPlayMachineViewResponse {
  launch_options: {
    game_url: string;
    strategy: 'redirect' | 'detect';
  };
}

export type GetMachineViewResponse = MachineView;
export type GetMachinesViewsResponse = ReadonlyArray<MachineView>;

export interface GetMachineViewSliceParams {
  slug: string;
}

export interface PostPlayMachineViewSliceParams {
  slug: string;
}

export interface PostFavoriteMachineViewPayload {
  favoriteType: 'machine_view';
  subjectId: string;
}

export type GetFavoritesMachinesViewResponse = ReadonlyArray<{
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  favoriteType: 'machine_view';
  playerId: string;
  subjectId: string;
  subject: MachineView;
}>;

// In sync with «authentication-backend» service — src/types.ts
export enum EAuthenticationTicketTypes {
  EMAIL = 'email_verification',
  PASSWORD = 'password_reset',
}

export type AuthenticationTicketTypes = `${EAuthenticationTicketTypes}`;
