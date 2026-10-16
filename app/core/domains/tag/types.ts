import { ValueOf } from '@/utils/typescript';

export const TagTypeEnums = {
  PLAYER: 'player',
  MACHINE: 'machine',
} as const;

export type TagType = ValueOf<typeof TagTypeEnums>;

export interface Tag {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  key: string;
  name: string;
  color: string;
  type: TagType;
  casinoId: string;
}
