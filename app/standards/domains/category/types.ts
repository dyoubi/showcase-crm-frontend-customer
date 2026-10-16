// ⚠️ in this file it's forbidden to import anything related to ReactJS or any framework

import { ValueOf } from '@/utils/typescript';

export type Category = {
  name: string;
  slug: string;
};

export type GetCategoryResponse = Category;

export type PostCategoryPayload = Category;

export type PostCategoryResponse = Category;

export const BuiltInCategoriesSlugsEnum = {
  RECOMMANDED: 'recommanded',
  SLOTS: 'slots',
  LIVE_CASINO: 'livecasino',
  NEW: 'new',
  BUY_IN_FEATURE: 'buyinfeature',
} as const;

export type BuiltInCategoriesSlugs = ValueOf<typeof BuiltInCategoriesSlugsEnum>;
