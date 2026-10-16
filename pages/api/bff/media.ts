import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import { constants, createReadStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

const CACHE_CONFIG = {
  gamesDir: '.cache/games',
  promotionsDir: '.cache/promotions',
  carouselDir: '.cache/carousel',
  articlesDir: '.cache/articles',
};

// Supported media types and their corresponding directories
const MEDIA_TYPES = {
  games: CACHE_CONFIG.gamesDir,
  promotions: CACHE_CONFIG.promotionsDir,
  carousel: CACHE_CONFIG.carouselDir,
  articles: CACHE_CONFIG.articlesDir,
} as const;

type MediaType = keyof typeof MEDIA_TYPES;

// Optimize API route for large files
export const config = {
  api: {
    responseLimit: false, // Disable default 4MB limit for media files
    bodyParser: false, // We don't need body parsing for this endpoint
  },
};

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | void> {
  const startTime = process.env.NODE_ENV === 'development' ? Date.now() : 0;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, filename } = req.query;

  if (!type || !filename || typeof type !== 'string' || typeof filename !== 'string') {
    return res.status(400).json({ message: 'Media type and filename are required' });
  }

  if (!Object.keys(MEDIA_TYPES).includes(type)) {
    return res.status(400).json({
      message: 'Invalid media type',
      supportedTypes: Object.keys(MEDIA_TYPES),
    });
  }

  if (type === 'games' && !filename.endsWith('-desktop.png') && !filename.endsWith('-mobile.png')) {
    return res.status(400).json({
      message: 'Invalid filename format. Use the full slug with device type.',
    });
  }

  // get subdirectory by removing the device type from the filename
  const subdirectory = filename.replace(/-(desktop|mobile)\.png$/, '');

  try {
    const pathResolutionStart = process.env.NODE_ENV === 'development' ? Date.now() : 0;
    const mediaType = type as MediaType;
    const mediaDirectory = MEDIA_TYPES[mediaType];
    const filePath =
      mediaType === 'games'
        ? path.join(process.cwd(), mediaDirectory, subdirectory, filename)
        : path.join(process.cwd(), mediaDirectory, filename);

    // Security check: ensure the resolved path is within the cache directory
    const resolvedPath = path.resolve(filePath);
    const cacheRoot = path.resolve(process.cwd(), mediaDirectory);

    if (!resolvedPath.startsWith(cacheRoot)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`Path resolution took: ${Date.now() - pathResolutionStart}ms`);
    }

    // Check if file exists and get stats in one operation
    let stats;
    const statStart = process.env.NODE_ENV === 'development' ? Date.now() : 0;

    try {
      stats = await fs.stat(filePath);

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`File stat took: ${Date.now() - statStart}ms`);
      }
    } catch (error) {
      return res.status(404).json({ message: 'Media file not found' });
    }

    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';

    switch (ext) {
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
      default:
        contentType = 'application/octet-stream';
    }

    // Set appropriate headers for better performance
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);

    // Enhanced caching for better performance
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year cache for media files
    res.setHeader('ETag', `"${stats.mtime.getTime()}-${stats.size}"`);

    // Add compression support
    res.setHeader('Accept-Ranges', 'bytes');

    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Handle conditional requests for better caching
    const ifNoneMatch = req.headers['if-none-match'];
    const etag = `"${stats.mtime.getTime()}-${stats.size}"`;

    if (ifNoneMatch === etag) {
      return res.status(304).end();
    }

    // Handle range requests for better streaming performance
    const { range } = req.headers;
    let start = 0;
    let end = stats.size - 1;

    if (range) {
      const ranges = range.replace(/bytes=/, '').split('-');

      start = parseInt(ranges[0], 10) || 0;
      end = parseInt(ranges[1], 10) || stats.size - 1;

      if (start >= stats.size || end >= stats.size) {
        res.setHeader('Content-Range', `bytes */${stats.size}`);

        return res.status(416).end();
      }

      res.setHeader('Content-Range', `bytes ${start}-${end}/${stats.size}`);
      res.setHeader('Content-Length', end - start + 1);
      res.status(206); // Partial Content
    }

    // Stream the file instead of loading it into memory
    try {
      const streamStart = process.env.NODE_ENV === 'development' ? Date.now() : 0;
      const fileStream = range ? createReadStream(filePath, { start, end }) : createReadStream(filePath);

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`Stream creation took: ${Date.now() - streamStart}ms`);
      }

      // Use pipeline for better error handling and performance
      const pipelineStart = process.env.NODE_ENV === 'development' ? Date.now() : 0;

      await pipeline(fileStream, res);

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`Pipeline took: ${Date.now() - pipelineStart}ms`);
        // eslint-disable-next-line no-console
        console.log(`Total request time: ${Date.now() - startTime}ms`);
      }
    } catch (streamError) {
      // eslint-disable-next-line no-console
      console.error('Error streaming file:', streamError);

      if (!res.headersSent) {
        return res.status(500).json({ message: 'Error streaming file' });
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error serving media file:', error);

    return res.status(500).json({ message: 'Internal server error' });
  }
}
