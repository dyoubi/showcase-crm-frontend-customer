import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

import { casinoApiRequest } from '@/core/domains/api';

import { encodeFilter } from '@/utils/url';

const CACHE_CONFIG = {
  outputDir: '.cache/content-export',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Try to get cached data first
    const cachedData = await getCachedCategoriesData();

    if (cachedData && cachedData.length > 0) {
      return res.status(200).json(cachedData);
    }

    // Fall back to API call if cache miss
    const apiData = await getCategoriesFromAPI();

    return res.status(200).json(apiData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching categories data:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedCategoriesData() {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const categoryDirs = await fs.readdir(contentDir);

    const categories = await Promise.all(
      categoryDirs.map(async (categoryDir) => {
        try {
          const categoryPath = path.join(contentDir, categoryDir);
          const categoryFilePath = path.join(categoryPath, 'category.json');
          const categoryData = await fs.readFile(categoryFilePath, 'utf8');
          const category = JSON.parse(categoryData);

          // Remove machine views to reduce response size
          const { machineViews, ...categoryWithoutMachines } = category;

          return categoryWithoutMachines;
        } catch {
          // Return null if category.json not found
          return null;
        }
      }),
    );

    // Filter out null results and return categories
    return categories.filter((category) => category !== null);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading cached categories data:', error);

    return [];
  }
}

async function getCategoriesFromAPI() {
  const { data: categories } = await casinoApiRequest.get('/public/categories');

  // Return categories without machine views to avoid 4MB response limit
  // Machine views should be fetched separately when needed
  return categories;
}

async function getCategoryMachinesViewsFromAPI(slug: string, machinesLimit = 10) {
  const filter = {
    limit: machinesLimit,
    offset: 0,
  };
  const { data } = await casinoApiRequest.get(
    `/public/categories/${slug}/machine-views?filter=${encodeFilter(filter)}`,
  );

  return data;
}
