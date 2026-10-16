import { Nullable } from '@/core/interfaces/common';

import { DeepPartial } from '@/utils/typescript';

export interface PrivacySettings {
  rain: boolean;
  statistics: boolean;
  ghost: boolean;
}

interface Address {
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  streetType?: string;
  postalCode?: string;
  officeBoxNumber?: string | number;
  state?: string;
  locality?: string;
  region?: string;
}

export interface PlayerStatistics {
  rankLevel: number;
  rankPoint: number;
}

interface PlayerPrivacySettings {
  rain: boolean;
  statistics: boolean;
  ghost?: boolean;
}

export interface Player {
  id: string;
  email?: string;
  username?: string;
  nickname?: string;
  firstname?: string;
  lastname?: string;
  address?: Address;
  language?: string;
  gender?: 'm' | 'f';
  birthdate?: string | number;
  stats?: PlayerStatistics;
  privacy?: PlayerPrivacySettings;
  marketingAcceptation?: boolean;
  status?: string;
  userId: string;

  createdAt: string;
}

export type GetPlayerResponse = Player;

export type PatchPlayerPayload = Omit<DeepPartial<Player>, 'birthdate'>;
export type PatchPlayerResponse = void;

export type PostRegisterPlayerPayload = {
  birth: string;
  email: string;
  locale: string;
  metadata: {
    affiliateId?: string;
    affiliateToken?: string;
  };
  password: string;
  username: string;
};

export type PostRegisterPlayerResponse = {
  birthdate: Player['birthdate'];
  email: Player['email'];
  marketingAcceptation: Player['marketingAcceptation'];
  nickname: Player['nickname'];
  userId: Player['userId'];
};

export interface AuthState {
  loggedInUser: Nullable<Player>;
  accessToken: Nullable<string>;
}

export type PostValidatePlayerPayload = {
  token?: string;
};
