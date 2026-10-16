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

  const { articleKey, locale } = req.query;

  if (!articleKey || typeof articleKey !== 'string') {
    return res.status(400).json({ message: 'Article key is required' });
  }

  if (!locale || typeof locale !== 'string' || !['fr', 'en'].includes(locale)) {
    return res.status(400).json({ message: 'Valid locale (fr/en) is required' });
  }

  try {
    // Try to get cached data first
    const cachedData = await getCachedArticleData(articleKey, locale);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    // Fall back to API call if cache miss
    const apiData = await getArticleFromAPI(articleKey, locale);

    return res.status(200).json(apiData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching article data:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedArticleData(articleKey: string, locale: string) {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const articleDir = path.join(contentDir, 'articles', articleKey);
    const articleFilePath = path.join(articleDir, 'article.json');

    const articleData = await fs.readFile(articleFilePath, 'utf8');
    const parsed = JSON.parse(articleData);

    // Return the specific locale content
    const details = parsed.details?.[locale];

    if (details) {
      return details;
    }

    return null;
  } catch (error) {
    // Return null if article not found in cache
    return null;
  }
}

async function getArticleFromAPI(articleKey: string, locale: string) {
  const { data } = await casinoApiRequest.get(`/public/article/${articleKey}?contents=true&lang=${locale}`);

  return data;
}
