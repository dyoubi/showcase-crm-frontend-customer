import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

import { casinoApiRequest } from '@/core/domains/api';

const CACHE_CONFIG = {
  outputDir: '.cache/content-export',
  gamesDir: '.cache/games',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Game slug is required' });
  }

  try {
    // Try to get cached data first
    const cachedData = await getCachedGameData(slug);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    // Fall back to API call if cache miss
    const apiData = await getGameFromAPI(slug);

    return res.status(200).json(apiData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching game data:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedGameData(slug: string) {
  try {
    // Check all category folders for the game
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const categoryDirs = await fs.readdir(contentDir);

    // Use Promise.all with map to avoid for-of loop
    const results = await Promise.all(
      categoryDirs.map(async (categoryDir) => {
        try {
          const categoryPath = path.join(contentDir, categoryDir);
          const gameDir = path.join(categoryPath, slug);
          const gameFilePath = path.join(gameDir, 'machineview.json');
          const gameData = await fs.readFile(gameFilePath, 'utf8');

          return JSON.parse(gameData);
        } catch {
          // Return null if game not found in this category
          return null;
        }
      }),
    );

    // Return the first non-null result
    return results.find((result) => result !== null) || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading cached game data:', error);

    return null;
  }
}

async function getGameFromAPI(slug: string) {
  const { data } = await casinoApiRequest.get(`/public/machine-views/${slug}`);

  return data;
}
