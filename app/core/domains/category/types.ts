import { MachineView } from '@/core/domains/machineView';

import { ValueOf } from '@/utils/typescript';

export type Category = {
  id: string;
  name: string;
  key: string;
  description: string;
  image?: { url?: string };
  machineViews?: ReadonlyArray<MachineView>;
};

export type GetCategoryResponse = Category;

export type GetCategoryMachinesViewsResponse = ReadonlyArray<MachineView>;

export const BuiltInCategoriesSlugsEnum = {
  RECOMMANDED: 'recommanded',
  SLOTS: 'slots',
  LIVE_CASINO: 'livecasino',
  NEW: 'new',
  BUY_IN_FEATURE: 'buyinfeature',
} as const;

export type BuiltInCategoriesSlugsTypes = ValueOf<typeof BuiltInCategoriesSlugsEnum>;

export type GetCategoriesResponse = ReadonlyArray<Category>;
