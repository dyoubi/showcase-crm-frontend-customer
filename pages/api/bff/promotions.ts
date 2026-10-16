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
    const cachedData = await getCachedPromotionsData();

    if (cachedData && cachedData.length > 0) {
      return res.status(200).json(cachedData);
    }

    // Fall back to API call if cache miss
    const apiData = await getPromotionsFromAPI();

    return res.status(200).json(apiData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching promotions data:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCachedPromotionsData() {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const promotionsDir = path.join(contentDir, 'promotions');
    const promotionsFilePath = path.join(promotionsDir, 'promotions.json');

    const promotionsData = await fs.readFile(promotionsFilePath, 'utf8');
    const parsed = JSON.parse(promotionsData);

    return parsed.promotions || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading cached promotions data:', error);

    return [];
  }
}

async function getPromotionsFromAPI() {
  const { data: promotions } = await casinoApiRequest.get('/public/promotions');

  return promotions;
}

// Helper function to get all cached promotion details
export async function getAllCachedPromotionDetails() {
  try {
    const contentDir = path.join(process.cwd(), CACHE_CONFIG.outputDir);
    const promotionsDir = path.join(contentDir, 'promotions');

    // Read the main promotions list
    const promotionsFilePath = path.join(promotionsDir, 'promotions.json');
    const promotionsData = await fs.readFile(promotionsFilePath, 'utf8');
    const { promotions } = JSON.parse(promotionsData);

    // Get details for each promotion
    const promotionDetails = await Promise.all(
      promotions.map(async (promotion: any) => {
        try {
          const promotionDir = path.join(promotionsDir, promotion.key);
          const promotionFilePath = path.join(promotionDir, 'promotion.json');
          const promotionData = await fs.readFile(promotionFilePath, 'utf8');

          return JSON.parse(promotionData);
        } catch {
          return null;
        }
      }),
    );

    return promotionDetails.filter((detail) => detail !== null);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting cached promotion details:', error);

    return [];
  }
}
