const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// load dotenv to manage environment variables
require('dotenv').config();

console.log('Content Manager Loaded');

// Configuration - update these values according to your setup
const CONFIG = {
  publicBackendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  casinoKey: process.env.NEXT_CASINO_SLUG,
  outputDir: '.cache/content-export',
  gamesDir: '.cache/games',
  promotionsDir: '.cache/promotions',
  carouselDir: '.cache/carousel',
  articlesDir: '.cache/articles',
};

// Cache to store already processed machine views
const processedMachineViews = new Map();
const processedPromotions = new Map();
const processedCarouselItems = new Map();
const processedArticles = new Map();

// Create axios instance for API requests
const casinoApiRequest = axios.create({
  baseURL: CONFIG.publicBackendUrl,
  headers: {
    'x-casino-id': CONFIG.casinoKey,
  },
});

// Helper function to check if image should be downloaded
const shouldDownloadImage = async (url, filePath) => {
  if (!url) {
    return false;
  }

  try {
    // Check if file exists
    await fs.access(filePath);

    // File exists, check if URL has changed
    const metadataPath = filePath + '.meta';
    try {
      const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf-8'));
      if (metadata.url === url) {
        console.log(`Skipping download - file exists and URL unchanged: ${filePath}`);
        return false;
      }
      console.log(`URL changed for ${filePath}, will re-download`);
      return true;
    } catch (metaError) {
      // Metadata file doesn't exist, assume URL changed
      console.log(`No metadata found for ${filePath}, will download`);
      return true;
    }
  } catch (error) {
    // File doesn't exist, should download
    console.log(`File doesn't exist, will download: ${filePath}`);
    return true;
  }
};

// Helper function to save URL metadata
const saveImageMetadata = async (url, filePath) => {
  const metadataPath = filePath + '.meta';
  const metadata = {
    url: url,
    downloadedAt: new Date().toISOString(),
  };

  try {
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  } catch (error) {
    console.error(`Error saving metadata for ${filePath}:`, error.message);
  }
};

// Download image from URL and save to file with retry logic for 502 errors
// Only downloads if URL has changed or file doesn't exist
const downloadImage = async (url, filePath, maxRetries = 2) => {
  // Check if we should download this image
  const shouldDownload = await shouldDownloadImage(url, filePath);
  if (!shouldDownload) {
    return true; // Return true as the image is already available
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (!url) {
        console.log(`Skipping download - no URL provided for ${filePath}`);
        return false;
      }

      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
      });

      // Ensure directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Create write stream and pipe response
      const writer = require('fs').createWriteStream(filePath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', async () => {
          console.log(`Downloaded: ${filePath}`);
          // Save metadata after successful download
          await saveImageMetadata(url, filePath);
          resolve(true);
        });
        writer.on('error', (error) => {
          console.error(`Error downloading ${url} to ${filePath}:`, error.message);
          reject(error);
        });
      });
    } catch (error) {
      const is502Error = error.response?.status === 502;

      if (is502Error && attempt < maxRetries) {
        console.log(`502 error downloading ${url}, retrying... (attempt ${attempt}/${maxRetries})`);
        // Add a small delay before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        continue;
      }

      console.error(`Error downloading ${url} to ${filePath}:`, error.message);
      if (is502Error) {
        console.error(`Failed after ${maxRetries} attempts due to 502 errors`);
      }
      return false;
    }
  }
};

// Helper function to copy machine view folder (fallback when symlink fails)
const copyMachineViewFolder = async (sourcePath, targetPath) => {
  try {
    await fs.mkdir(targetPath, { recursive: true });

    const items = await fs.readdir(sourcePath);

    for (const item of items) {
      const sourceItemPath = path.join(sourcePath, item);
      const targetItemPath = path.join(targetPath, item);

      const stat = await fs.stat(sourceItemPath);

      if (stat.isDirectory()) {
        await copyMachineViewFolder(sourceItemPath, targetItemPath);
      } else {
        await fs.copyFile(sourceItemPath, targetItemPath);
      }
    }

    console.log(`    Copied folder: ${sourcePath} -> ${targetPath}`);
  } catch (error) {
    console.error(`    Error copying folder ${sourcePath} to ${targetPath}:`, error.message);
  }
};

// Get all categories
const getCategories = async () => {
  try {
    const { data } = await casinoApiRequest.get('/public/categories');
    console.log(`Found ${data.length} categories`);
    // console.log(resp);
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw error;
  }
};

// Get machine views for a specific category
const getCategoryMachinesViews = async (slug) => {
  try {
    const { data } = await casinoApiRequest.get(`/public/categories/${slug}/machine-views`);

    console.log(`Found ${data.length} machine views for category: ${slug}`);
    return data;
  } catch (error) {
    console.error(`Error fetching machine views for category ${slug}:`, error.message);
    return [];
  }
};

// Get all promotions
const getPromotions = async () => {
  try {
    const { data } = await casinoApiRequest.get('/public/promotions');
    console.log(`Found ${data.length} promotions`);
    return data;
  } catch (error) {
    console.error('Error fetching promotions:', error.message);
    return [];
  }
};

// Get carousel data
const getCarousel = async () => {
  try {
    const { data } = await casinoApiRequest.get('/public/carousels');
    console.log(`Found ${data.length} carousel items`);
    return data;
  } catch (error) {
    console.error('Error fetching carousel:', error.message);
    return [];
  }
};

// Get carousel content for a specific content ID
const getCarouselContent = async (contentId, lang, device) => {
  try {
    const queryParams = new URLSearchParams();
    if (lang) queryParams.append('lang', lang);
    if (device) queryParams.append('device', device);

    const url = `/public/contents/${contentId}/data?${queryParams.toString()}`;
    const { data } = await casinoApiRequest.get(url);
    console.log(`  Fetched carousel content for ${contentId} (${device}, ${lang})`);
    return data;
  } catch (error) {
    console.error(`Error fetching carousel content for ${contentId} (${device}, ${lang}):`, error.message);
    return null;
  }
};

// Get single promotion details with device and locale
const getPromotionDetails = async (slug, device, locale) => {
  try {
    const parameters = new URLSearchParams({
      contents: 'true',
      device: device,
      lang: locale,
    });

    const { data } = await casinoApiRequest.get(`/public/promotion/${slug}?${parameters.toString()}`);
    console.log(`  Fetched promotion details for ${slug} (${device}, ${locale})`);
    return data;
  } catch (error) {
    console.error(`Error fetching promotion details for ${slug} (${device}, ${locale}):`, error.message);
    return null;
  }
};

// Get article details with locale
const getArticleDetails = async (articleKey, lang) => {
  try {
    const { data } = await casinoApiRequest.get(`/public/article/${articleKey}?contents=true&lang=${lang}`);
    console.log(`  Fetched article details for ${articleKey} (${lang})`);
    return data;
  } catch (error) {
    console.error(`Error fetching article details for ${articleKey} (${lang}):`, error.message);
    return null;
  }
};

// Process a single category
const processCategory = async (category) => {
  console.log(`\nProcessing category: ${category.name} (${category.key})`);

  // Create category folder
  const categoryDir = path.join(CONFIG.outputDir, category.key);
  await fs.mkdir(categoryDir, { recursive: true });

  // Get machine views for this category
  const machineViews = await getCategoryMachinesViews(category.key);

  // Filter out machine views with invalid keys
  const validMachineViews = machineViews.filter((mv) => mv.key && mv.key !== 'undefined');

  if (validMachineViews.length !== machineViews.length) {
    console.log(`  Filtered out ${machineViews.length - validMachineViews.length} machine views with invalid keys`);
  }

  // Save category info with machine views
  const categoryData = {
    ...category,
    machineViews: validMachineViews,
    exportedAt: new Date().toISOString(),
    totalMachineViews: validMachineViews.length,
  };

  const categoryFilePath = path.join(categoryDir, 'category.json');
  await fs.writeFile(categoryFilePath, JSON.stringify(categoryData, null, 2));

  // Process machine views in batches of 20 to avoid overwhelming the server
  const batchSize = 20;
  for (let i = 0; i < validMachineViews.length; i += batchSize) {
    const batch = validMachineViews.slice(i, i + batchSize);
    console.log(
      `  Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(validMachineViews.length / batchSize)} (${
        batch.length
      } machine views)`,
    );

    const promiseArr = batch.map((machineView) => processMachineView(machineView, categoryDir));
    await Promise.all(promiseArr);
  }

  console.log(`Completed processing category: ${category.name}`);
};

// Process a single machine view
const processMachineView = async (machineView, categoryDir) => {
  // Validate machine view key
  if (!machineView.key || machineView.key === 'undefined') {
    console.log(`  Skipping machine view with invalid key: ${machineView.title} (key: ${machineView.key})`);
    return;
  }

  console.log(`  Processing machine view: ${machineView.title} (${machineView.key})`);

  // Check if this machine view has already been processed
  if (processedMachineViews.has(machineView.key)) {
    console.log(`    Machine view ${machineView.key} already processed, creating symlink...`);

    // Create symlink to existing machine view folder
    const existingPath = processedMachineViews.get(machineView.key);
    const symlinkPath = path.join(categoryDir, machineView.key);

    try {
      // Check if symlink already exists
      try {
        await fs.access(symlinkPath);
        console.log(`    Symlink already exists: ${symlinkPath}`);
        return;
      } catch {
        // Symlink doesn't exist, create it
      }

      await fs.symlink(path.relative(categoryDir, existingPath), symlinkPath);
      console.log(`    Created symlink: ${symlinkPath} -> ${existingPath}`);
    } catch (error) {
      console.error(`    Error creating symlink for ${machineView.key}:`, error.message);
      // Fallback: copy the existing folder
      await copyMachineViewFolder(existingPath, path.join(categoryDir, machineView.key));
    }
    return;
  }

  // Create machine view folder
  const machineViewDir = path.join(categoryDir, machineView.key);
  await fs.mkdir(machineViewDir, { recursive: true });

  const gamesDir = path.join(CONFIG.gamesDir, machineView.key);
  await fs.mkdir(gamesDir, { recursive: true });

  // Cache this machine view path
  processedMachineViews.set(machineView.key, machineViewDir);

  // Save machine view info as JSON
  const machineViewFilePath = path.join(machineViewDir, 'machineview.json');
  await fs.writeFile(machineViewFilePath, JSON.stringify(machineView, null, 2));
  console.log(`    Saved machine view data to: ${machineViewFilePath}`);

  // Download images if they exist
  const downloadPromises = [];

  if (machineView.image?.desktop?.url) {
    const desktopImagePath = path.join(gamesDir, `${machineView.key}-desktop.png`);
    downloadPromises.push(downloadImage(machineView.image.desktop.url, desktopImagePath));
  }

  if (machineView.image?.mobile?.url) {
    const mobileImagePath = path.join(gamesDir, `${machineView.key}-mobile.png`);
    downloadPromises.push(downloadImage(machineView.image.mobile.url, mobileImagePath));
  }

  // Wait for all downloads to complete
  if (downloadPromises.length > 0) {
    await Promise.all(downloadPromises);
  }

  console.log(`    Completed processing machine view: ${machineView.title}`);
};

// Process all promotions
const processPromotions = async () => {
  console.log('\nProcessing promotions...');

  // Create promotions folder
  const promotionsDir = path.join(CONFIG.outputDir, 'promotions');
  await fs.mkdir(promotionsDir, { recursive: true });
  await fs.mkdir(CONFIG.promotionsDir, { recursive: true });

  // Get all promotions
  const promotions = await getPromotions();

  // Save promotions info
  const promotionsData = {
    promotions: promotions,
    exportedAt: new Date().toISOString(),
    totalPromotions: promotions.length,
  };

  const promotionsFilePath = path.join(promotionsDir, 'promotions.json');
  await fs.writeFile(promotionsFilePath, JSON.stringify(promotionsData, null, 2));
  console.log(`  Saved promotions data to: ${promotionsFilePath}`);

  // Process each promotion
  for (const promotion of promotions) {
    await processPromotion(promotion);
  }

  console.log(`Completed processing ${promotions.length} promotions`);
};

// Process a single promotion
const processPromotion = async (promotion) => {
  console.log(`  Processing promotion: ${promotion.name} (${promotion.key})`);

  const promotionKey = promotion.key;

  // Check if this promotion has already been processed
  if (processedPromotions.has(promotionKey)) {
    console.log(`    Promotion ${promotionKey} already processed, skipping...`);
    return;
  }

  // Cache this promotion
  processedPromotions.set(promotionKey, true);

  // Create promotion-specific folder
  const promotionDir = path.join(CONFIG.outputDir, 'promotions', promotionKey);
  await fs.mkdir(promotionDir, { recursive: true });

  // Define devices and locales to process
  const devices = ['mobile', 'desktop'];
  const locales = ['fr', 'en'];

  // Fetch detailed content for each device/locale combination
  const detailPromises = [];
  const promotionDetails = {};

  for (const device of devices) {
    for (const locale of locales) {
      const detailPromise = getPromotionDetails(promotionKey, device, locale).then((details) => {
        if (details) {
          if (!promotionDetails[device]) {
            promotionDetails[device] = {};
          }
          promotionDetails[device][locale] = details;
        }
      });
      detailPromises.push(detailPromise);
    }
  }

  // Wait for all detail fetches to complete
  await Promise.all(detailPromises);

  // Save promotion details
  const promotionData = {
    basic: promotion,
    details: promotionDetails,
    exportedAt: new Date().toISOString(),
  };

  const promotionFilePath = path.join(promotionDir, 'promotion.json');
  await fs.writeFile(promotionFilePath, JSON.stringify(promotionData, null, 2));
  console.log(`    Saved promotion data to: ${promotionFilePath}`);

  // Download images from detailed content
  const downloadPromises = [];

  for (const device of devices) {
    for (const locale of locales) {
      const details = promotionDetails[device]?.[locale];
      if (details) {
        // Download banner
        if (details.banner?.contentURL) {
          const bannerPath = path.join(CONFIG.promotionsDir, `${promotionKey}-banner-${device}-${locale}.png`);
          downloadPromises.push(downloadImage(details.banner.contentURL, bannerPath));
        }

        // Download header
        if (details.header?.contentURL) {
          const headerPath = path.join(CONFIG.promotionsDir, `${promotionKey}-header-${device}-${locale}.png`);
          downloadPromises.push(downloadImage(details.header.contentURL, headerPath));
        }

        // Download thumbnail
        if (details.thumbnail?.contentURL) {
          const thumbnailPath = path.join(CONFIG.promotionsDir, `${promotionKey}-thumbnail-${device}-${locale}.png`);
          downloadPromises.push(downloadImage(details.thumbnail.contentURL, thumbnailPath));
        }
      }
    }
  }

  // Wait for all downloads to complete
  if (downloadPromises.length > 0) {
    await Promise.all(downloadPromises);
  }

  console.log(`    Completed processing promotion: ${promotion.name}`);
};

// Process all carousel items
const processCarousel = async () => {
  console.log('\nProcessing carousel...');

  // Create carousel folder
  const carouselDir = path.join(CONFIG.outputDir, 'carousel');
  await fs.mkdir(carouselDir, { recursive: true });
  await fs.mkdir(CONFIG.carouselDir, { recursive: true });

  // Get all carousel items
  const carouselItems = await getCarousel();

  // Save carousel info
  const carouselData = {
    items: carouselItems,
    exportedAt: new Date().toISOString(),
    totalItems: carouselItems.length,
  };

  const carouselFilePath = path.join(carouselDir, 'carousel.json');
  await fs.writeFile(carouselFilePath, JSON.stringify(carouselData, null, 2));
  console.log(`  Saved carousel data to: ${carouselFilePath}`);

  // Process each carousel item
  for (const item of carouselItems) {
    await processCarouselItem(item);
  }

  console.log(`Completed processing ${carouselItems.length} carousel items`);
};

// Process a single carousel item
const processCarouselItem = async (carousel) => {
  console.log(`  Processing carousel: ${carousel.key} (${carousel.id})`);

  const carouselKey = carousel.key || carousel.id;

  // Check if this carousel has already been processed
  if (processedCarouselItems.has(carouselKey)) {
    console.log(`    Carousel ${carouselKey} already processed, skipping...`);
    return;
  }

  // Cache this carousel
  processedCarouselItems.set(carouselKey, true);

  // Create carousel-specific folder
  const carouselItemDir = path.join(CONFIG.outputDir, 'carousel', carouselKey);
  await fs.mkdir(carouselItemDir, { recursive: true });

  // Define devices and locales to process
  const devices = ['mobile', 'desktop'];
  const locales = ['fr', 'en'];

  // Process each carousel item content
  const carouselContents = {};

  for (const carouselItem of carousel.items || []) {
    const contentId = carouselItem.contentId;

    if (!contentId) continue;

    console.log(`    Processing content ID: ${contentId}`);

    // Fetch content for each device/locale combination
    const contentPromises = [];
    const itemContents = {};

    for (const device of devices) {
      for (const locale of locales) {
        const contentPromise = getCarouselContent(contentId, locale, device).then((content) => {
          if (content) {
            if (!itemContents[device]) {
              itemContents[device] = {};
            }
            itemContents[device][locale] = content;
          }
        });
        contentPromises.push(contentPromise);
      }
    }

    // Wait for all content fetches to complete
    await Promise.all(contentPromises);

    // Store the content with carousel item metadata
    carouselContents[contentId] = {
      ...carouselItem,
      contents: itemContents,
    };

    // Download content images
    const downloadPromises = [];

    for (const device of devices) {
      for (const locale of locales) {
        const content = itemContents[device]?.[locale];
        if (content?.contentURL) {
          const imagePath = path.join(CONFIG.carouselDir, `${carouselKey}-${contentId}-${device}-${locale}.png`);
          downloadPromises.push(downloadImage(content.contentURL, imagePath));
        }
      }
    }

    // Wait for all downloads to complete
    if (downloadPromises.length > 0) {
      await Promise.all(downloadPromises);
    }
  }

  // Save carousel details
  const carouselData = {
    basic: carousel,
    contents: carouselContents,
    exportedAt: new Date().toISOString(),
  };

  const carouselFilePath = path.join(carouselItemDir, 'carousel.json');
  await fs.writeFile(carouselFilePath, JSON.stringify(carouselData, null, 2));
  console.log(`    Saved carousel data to: ${carouselFilePath}`);

  console.log(`    Completed processing carousel: ${carousel.key}`);
};

// Process all articles
const processArticles = async () => {
  console.log('\nProcessing articles...');

  // Create articles folder
  const articlesDir = path.join(CONFIG.outputDir, 'articles');
  await fs.mkdir(articlesDir, { recursive: true });
  await fs.mkdir(CONFIG.articlesDir, { recursive: true });

  // Define article keys to process (from the BuildInArticlesSlugs enum)
  const articleKeys = [
    'privacy-policy',
    'aml-policy',
    'terms-of-service',
    'dispute-resolution',
    'fairness',
    'responsible-gaming',
  ];

  // Define locales to process
  const locales = ['fr', 'en'];

  // Save articles list info
  const articlesData = {
    articles: articleKeys,
    exportedAt: new Date().toISOString(),
    totalArticles: articleKeys.length,
  };

  const articlesFilePath = path.join(articlesDir, 'articles.json');
  await fs.writeFile(articlesFilePath, JSON.stringify(articlesData, null, 2));
  console.log(`  Saved articles data to: ${articlesFilePath}`);

  // Process each article
  for (const articleKey of articleKeys) {
    await processArticle(articleKey, locales);
  }

  console.log(`Completed processing ${articleKeys.length} articles`);
};

// Process a single article
const processArticle = async (articleKey, locales) => {
  console.log(`  Processing article: ${articleKey}`);

  // Check if this article has already been processed
  if (processedArticles.has(articleKey)) {
    console.log(`    Article ${articleKey} already processed, skipping...`);
    return;
  }

  // Cache this article
  processedArticles.set(articleKey, true);

  // Create article-specific folder
  const articleDir = path.join(CONFIG.outputDir, 'articles', articleKey);
  await fs.mkdir(articleDir, { recursive: true });

  // Fetch detailed content for each locale
  const detailPromises = [];
  const articleDetails = {};

  for (const locale of locales) {
    const detailPromise = getArticleDetails(articleKey, locale).then((details) => {
      if (details) {
        articleDetails[locale] = details;
      }
    });
    detailPromises.push(detailPromise);
  }

  // Wait for all detail fetches to complete
  await Promise.all(detailPromises);

  // Save article details
  const articleData = {
    key: articleKey,
    details: articleDetails,
    exportedAt: new Date().toISOString(),
  };

  const articleFilePath = path.join(articleDir, 'article.json');
  await fs.writeFile(articleFilePath, JSON.stringify(articleData, null, 2));
  console.log(`    Saved article data to: ${articleFilePath}`);

  console.log(`    Completed processing article: ${articleKey}`);
};

// Main function to export all content
const exportAllContent = async () => {
  try {
    const stime = new Date();
    console.log('Starting content export...', stime.toISOString());
    console.log(`Output directory: ${CONFIG.outputDir}`);
    console.log(`Using API URL: ${CONFIG.publicBackendUrl}`);
    console.log(`Using Casino Key: ${CONFIG.casinoKey}`);

    // Create main output directory
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    await fs.mkdir(CONFIG.gamesDir, { recursive: true });
    await fs.mkdir(CONFIG.promotionsDir, { recursive: true });
    await fs.mkdir(CONFIG.carouselDir, { recursive: true });
    await fs.mkdir(CONFIG.articlesDir, { recursive: true });

    // Get all categories
    const categories = await getCategories();
    // Process each category
    for (const category of categories) {
      await processCategory(category);
    }

    // Process promotions
    await processPromotions();

    // Process carousel
    await processCarousel();

    // Process articles
    await processArticles();

    console.log('\n✅ Content export completed successfully!');
    console.log(`📁 Check the ${CONFIG.outputDir} folder for exported content`);
    console.log(`📊 Total unique machine views processed: ${processedMachineViews.size}`);
    console.log(`🎁 Total promotions processed: ${processedPromotions.size}`);
    console.log(`🎠 Total carousel items processed: ${processedCarouselItems.size}`);
    console.log(`📰 Total articles processed: ${processedArticles.size}`);

    // Log sitemap information
    // const cachedGames = await getAllCachedGames();
    // console.log(`🗺️  ${cachedGames.length} game URLs will be included in sitemap generation`);

    const etime = new Date();
    const duration = etime - stime;
    console.log(`⏱️ Export duration: ${duration / (1000 * 60)} minutes`);

    // Only exit if running directly (not in worker thread)
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error('\n❌ Content export failed:', error.message);

    // Only exit if running directly (not in worker thread)
    if (require.main === module) {
      process.exit(1);
    } else {
      // Re-throw the error for worker thread handling
      throw error;
    }
  }
};

// Export the main function for external use
module.exports = {
  exportAllContent,
  CONFIG,
  processedMachineViews,
  processedPromotions,
  processedCarouselItems,
  processedArticles,
  getPromotions,
  getPromotionDetails,
  getCarousel,
  getCarouselContent,
  getArticleDetails,
  processPromotions,
  processCarousel,
  processArticles,
  downloadImage,
  shouldDownloadImage,
  saveImageMetadata,
};

// Helper function to get all cached games for sitemap generation
const getAllCachedGames = async () => {
  const games = [];

  try {
    const outputDir = CONFIG.outputDir;
    const categories = await fs.readdir(outputDir);

    for (const categorySlug of categories) {
      const categoryPath = path.join(outputDir, categorySlug);
      const categoryFile = path.join(categoryPath, 'category.json');

      try {
        const categoryData = JSON.parse(await fs.readFile(categoryFile, 'utf-8'));

        if (categoryData.machineViews && Array.isArray(categoryData.machineViews)) {
          for (const machineView of categoryData.machineViews) {
            if (machineView.key) {
              games.push({
                key: machineView.key,
                title: machineView.title,
                category: categorySlug,
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error reading category ${categorySlug}:`, error.message);
      }
    }

    // Remove duplicates
    const uniqueGames = games.filter((game, index, self) => index === self.findIndex((g) => g.key === game.key));

    return uniqueGames;
  } catch (error) {
    console.error('Error getting cached games:', error.message);
    return [];
  }
};

// Export the helper function
module.exports.getAllCachedGames = getAllCachedGames;

// Helper function to get all cached promotions
const getAllCachedPromotions = async () => {
  try {
    const promotionsDir = path.join(CONFIG.outputDir, 'promotions');
    const promotionsFile = path.join(promotionsDir, 'promotions.json');

    const promotionsData = JSON.parse(await fs.readFile(promotionsFile, 'utf-8'));
    return promotionsData.promotions || [];
  } catch (error) {
    console.error('Error getting cached promotions:', error.message);
    return [];
  }
};

// Helper function to get cached promotion details for a specific promotion
const getCachedPromotionDetails = async (promotionKey) => {
  try {
    const promotionDir = path.join(CONFIG.outputDir, 'promotions', promotionKey);
    const promotionFile = path.join(promotionDir, 'promotion.json');

    const promotionData = JSON.parse(await fs.readFile(promotionFile, 'utf-8'));
    return promotionData;
  } catch (error) {
    console.error(`Error getting cached promotion details for ${promotionKey}:`, error.message);
    return null;
  }
};

// Helper function to get all cached carousel items
const getAllCachedCarousel = async () => {
  try {
    const carouselDir = path.join(CONFIG.outputDir, 'carousel');
    const carouselFile = path.join(carouselDir, 'carousel.json');

    const carouselData = JSON.parse(await fs.readFile(carouselFile, 'utf-8'));
    return carouselData.items || [];
  } catch (error) {
    console.error('Error getting cached carousel:', error.message);
    return [];
  }
};

// Helper function to get cached carousel details for a specific carousel
const getCachedCarouselDetails = async (carouselKey) => {
  try {
    const carouselDir = path.join(CONFIG.outputDir, 'carousel', carouselKey);
    const carouselFile = path.join(carouselDir, 'carousel.json');

    const carouselData = JSON.parse(await fs.readFile(carouselFile, 'utf-8'));
    return carouselData;
  } catch (error) {
    console.error(`Error getting cached carousel details for ${carouselKey}:`, error.message);
    return null;
  }
};

// Helper function to get all cached articles
const getAllCachedArticles = async () => {
  try {
    const articlesDir = path.join(CONFIG.outputDir, 'articles');
    const articlesFile = path.join(articlesDir, 'articles.json');

    const articlesData = JSON.parse(await fs.readFile(articlesFile, 'utf-8'));
    return articlesData.articles || [];
  } catch (error) {
    console.error('Error getting cached articles:', error.message);
    return [];
  }
};

// Helper function to get cached article details for a specific article
const getCachedArticleDetails = async (articleKey) => {
  try {
    const articleDir = path.join(CONFIG.outputDir, 'articles', articleKey);
    const articleFile = path.join(articleDir, 'article.json');

    const articleData = JSON.parse(await fs.readFile(articleFile, 'utf-8'));
    return articleData;
  } catch (error) {
    console.error(`Error getting cached article details for ${articleKey}:`, error.message);
    return null;
  }
};

// Export the helper functions
module.exports.getAllCachedPromotions = getAllCachedPromotions;
module.exports.getCachedPromotionDetails = getCachedPromotionDetails;
module.exports.getAllCachedCarousel = getAllCachedCarousel;
module.exports.getCachedCarouselDetails = getCachedCarouselDetails;
module.exports.getAllCachedArticles = getAllCachedArticles;
module.exports.getCachedArticleDetails = getCachedArticleDetails;

// Run the export if this file is executed directly
if (require.main === module) {
  exportAllContent();
}
