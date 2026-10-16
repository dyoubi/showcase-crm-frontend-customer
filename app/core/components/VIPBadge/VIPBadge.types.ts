import { ReactNode } from 'react';

export enum VIPBadgeLevel {
  Default = 'default',
  Bronze = 'bronze-1',
  Silver = 'silver-1',
  Gold = 'gold-1',
  Platinum1 = 'platinum-1',
  Platinum2 = 'platinum-2',
  Platinum3 = 'platinum-3',
  Platinum4 = 'platinum-4',
}

export enum VIPBadgeSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export type VIPBadgeProps = {
  level?: VIPBadgeLevel;
  size?: VIPBadgeSize;
  children?: ReactNode;
};
