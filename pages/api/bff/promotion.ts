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

  const { slug } = req.query;

  const { device, locale } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Promotion slug is required' });
  }

  if (!device || typeof device !== 'string' || !['mobile', 'desktop'].includes(device)) {
    return res.status(400).json({ message: 'Valid device (mobile/desktop) is required' });
  }

  if (!locale || typeof locale !== 'string' || !['fr', 'en'].includes(locale)) {
    return res.status(400).json({ message: 'Valid locale (fr/en) is required' });
  }

  try {
    // Try to get cached data first
    const cachedData = await getCachedPromotionData(slug, device, locale);

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    // Fall back to API call if cache miss
    const apiData = await getPromotionFromAPI(slug, device, locale);

    return res.status(200).json(apiData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching promotion data:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedPromotionData(slug: string, device: string, locale: string) {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const promotionDir = path.join(contentDir, 'promotions', slug);
    const promotionFilePath = path.join(promotionDir, 'promotion.json');

    const promotionData = await fs.readFile(promotionFilePath, 'utf8');
    const parsed = JSON.parse(promotionData);

    // Return the specific device/locale combination
    const details = parsed.details?.[device]?.[locale];

    if (details) {
      return details;
    }

    return null;
  } catch (error) {
    // Return null if promotion not found in cache
    return null;
  }
}

async function getPromotionFromAPI(slug: string, device: string, locale: string) {
  const parameters = new URLSearchParams({
    contents: 'true',
    device,
    lang: locale,
  });

  const { data } = await casinoApiRequest.get(`/public/promotion/${slug}?${parameters.toString()}`);

  return data;
}
