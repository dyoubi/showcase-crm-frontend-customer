// ⚠️ in this file it's forbidden to import anything related to ReactJS or any framework
// in this file we put all logic & business logic related to the domain

import * as t from './types';

export const isBuiltInCategory = (slug?: string): slug is t.BuiltInCategoriesSlugs => {
  const builtInSlugList: Array<string> = Object.values(t.BuiltInCategoriesSlugsEnum);

  return builtInSlugList.includes(slug || '');
};
