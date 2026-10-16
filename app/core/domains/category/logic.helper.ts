import { BuiltInCategoriesSlugsEnum, BuiltInCategoriesSlugsTypes } from './types';

export const isBuiltInCategory = (slug?: string): slug is BuiltInCategoriesSlugsTypes => {
  const builtInSlugList: Array<string> = Object.values(BuiltInCategoriesSlugsEnum);

  return builtInSlugList.includes(slug || '');
};
