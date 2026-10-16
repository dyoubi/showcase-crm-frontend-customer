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

  const { carouselKey, contentId, device = 'desktop', locale = 'en' } = req.query;

  if (!carouselKey || typeof carouselKey !== 'string') {
    return res.status(400).json({ message: 'Carousel key is required' });
  }

  if (!contentId || typeof contentId !== 'string') {
    return res.status(400).json({ message: 'Content ID is required' });
  }

  try {
    // Try to get cached data first
    const cachedData = await getCachedCarouselContentData(carouselKey, contentId, device as string, locale as string);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    // Fall back to API call if cache miss
    const apiData = await getCarouselContentFromAPI(contentId, locale as string, device as string);

    return res.status(200).json(apiData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching carousel content data:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedCarouselContentData(carouselKey: string, contentId: string, device?: string, locale?: string) {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const carouselDir = path.join(contentDir, 'carousel', carouselKey);
    const carouselFilePath = path.join(carouselDir, 'carousel.json');

    const carouselData = await fs.readFile(carouselFilePath, 'utf8');
    const parsed = JSON.parse(carouselData);

    // Find the specific content item
    const content = parsed.contents?.[contentId];

    if (!content) {
      return null;
    }

    // If device and locale are specified, return specific content
    if (device && locale && typeof device === 'string' && typeof locale === 'string') {
      return content.contents?.[device]?.[locale] || null;
    }

    // Otherwise return all content for this contentId
    return content;
  } catch (error) {
    // Return null if carousel content not found in cache
    return null;
  }
}

async function getCarouselContentFromAPI(contentId: string, lang?: string, device?: string) {
  const queryParams = new URLSearchParams();

  if (lang && typeof lang === 'string') queryParams.append('lang', lang);

  if (device && typeof device === 'string') queryParams.append('device', device);

  const url = `/public/contents/${contentId}/data?${queryParams.toString()}`;

  const { data } = await casinoApiRequest.get(url);

  return data;
}
