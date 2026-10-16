import { bffApiRequest } from '@/core/domains/api';

import { encodeFilter } from '@/utils/url';

import * as t from './types';

export const getCategory = async ({ slug = '' }) => {
  const { data } = await bffApiRequest.get<t.GetCategoryResponse>(`/category?slug=${slug}`);

  return {
    ...data,
    machinesViews: data.machineViews,
  };
};

export const getCategories = async () => {
  const { data } = await bffApiRequest.get<t.GetCategoriesResponse>(`/categories`);

  return Promise.all(
    data.map(async (category) => ({
      ...category,
      machinesViews: await getCategoryMachinesViews({ slug: category?.key }),
    })),
  );
};

export const getCategoryMachinesViews = async ({ slug = '', machinesLimit = 32 }) => {
  const { data } = await bffApiRequest.get<t.GetCategoryMachinesViewsResponse>(
    `/category-machine-views?slug=${slug}&machinesLimit=${machinesLimit}`,
  );

  return data;
};
