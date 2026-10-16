import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

import { casinoApiRequest } from '@/core/domains/api';

const CACHE_CONFIG = {
  outputDir: '.cache/content-export',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Try to get cached data first
    const cachedData = await getCachedCarouselsData();

    if (cachedData && cachedData.length > 0) {
      return res.status(200).json(cachedData);
    }

    // Fall back to API call if cache miss
    const apiData = await getCarouselsFromAPI();

    return res.status(200).json(apiData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching carousels data:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedCarouselsData() {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const carouselDir = path.join(contentDir, 'carousel');
    const carouselFilePath = path.join(carouselDir, 'carousel.json');

    const carouselData = await fs.readFile(carouselFilePath, 'utf8');
    const parsed = JSON.parse(carouselData);

    return parsed.items || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading cached carousels data:', error);

    return [];
  }
}

async function getCarouselsFromAPI() {
  const { data: carousels } = await casinoApiRequest.get('/public/carousels');

  return carousels;
}
