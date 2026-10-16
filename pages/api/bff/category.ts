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

  const { slug, machinesLimit } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Category slug is required' });
  }

  try {
    // Try to get cached data first
    const cachedData = await getCachedCategoryData(slug);

    if (cachedData) {
      // If machinesLimit is specified, slice the machine views
      if (machinesLimit && typeof machinesLimit === 'string') {
        const limit = parseInt(machinesLimit, 10);

        cachedData.machineViews = cachedData?.machineViews?.slice(0, limit) || [];
      }

      return res.status(200).json(cachedData);
    }

    // Fall back to API call if cache miss
    const apiData = await getCategoryFromAPI(slug);

    return res.status(200).json(apiData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching category data:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedCategoryData(slug: string) {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const categoryPath = path.join(contentDir, slug);
    const categoryFilePath = path.join(categoryPath, 'category.json');

    const categoryData = await fs.readFile(categoryFilePath, 'utf8');

    return JSON.parse(categoryData);
  } catch (error) {
    // Return null if category not found in cache
    return null;
  }
}

async function getCategoryFromAPI(slug: string, machinesLimit = 10) {
  const { data } = await casinoApiRequest.get(`/public/categories/${slug}/`);
  const machinesViews = await getCategoryMachinesViewsFromAPI(slug, machinesLimit);

  return {
    ...data,
    machineViews: machinesViews,
  };
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
