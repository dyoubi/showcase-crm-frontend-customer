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
    const cachedData = await getCachedArticlesData();

    if (cachedData && cachedData.length > 0) {
      return res.status(200).json(cachedData);
    }

    // Fall back to returning the predefined article keys
    const articleKeys = [
      'privacy-policy',
      'aml-policy',
      'terms-of-service',
      'dispute-resolution',
      'fairness',
      'responsible-gaming',
    ];

    return res.status(200).json(articleKeys);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching articles data:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedArticlesData() {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const articlesDir = path.join(contentDir, 'articles');
    const articlesFilePath = path.join(articlesDir, 'articles.json');

    const articlesData = await fs.readFile(articlesFilePath, 'utf8');
    const parsed = JSON.parse(articlesData);

    return parsed.articles || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading cached articles data:', error);

    return [];
  }
}
