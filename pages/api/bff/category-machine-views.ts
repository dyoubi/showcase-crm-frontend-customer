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

  const { slug, machinesLimit = 32 } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Category slug is required' });
  }

  const limit = typeof machinesLimit === 'string' ? parseInt(machinesLimit, 10) : 32;

  try {
    // Try to get cached data first
    const cachedData = await getCachedCategoryMachinesViews(slug, limit);

    if (cachedData && cachedData.length > 0) {
      return res.status(200).json(cachedData);
    }

    // Fall back to API call if cache miss
    const apiData = await getCategoryMachinesViewsFromAPI(slug, limit);

    return res.status(200).json(apiData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching category machine views:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedCategoryMachinesViews(slug: string, machinesLimit: number) {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const categoryPath = path.join(contentDir, slug);
    const categoryFilePath = path.join(categoryPath, 'category.json');

    const categoryData = await fs.readFile(categoryFilePath, 'utf8');
    const category = JSON.parse(categoryData);

    // Return the machine views, limited by the requested amount
    return category.machineViews ? category.machineViews.slice(0, machinesLimit) : [];
  } catch (error) {
    // Return empty array if category not found in cache
    return [];
  }
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
