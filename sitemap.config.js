/** @type {import('next-sitemap').IConfig} */

const fs = require('fs').promises;
const path = require('path');

const getCategories = async () => {
  return [
    { slug: 'recommanded' },
    { slug: 'slots' },
    { slug: 'livecasino' },
    { slug: 'gameshow' },
    { slug: 'new' },
    { slug: 'buyinfeature' },
  ];
};

const getCachedGames = async () => {
  const contentDir = '.cache/content-export';

  try {
    // Check if cache directory exists
    await fs.access(contentDir);

    // Read all category directories
    const categories = await fs.readdir(contentDir);

    // Process categories in parallel
    const categoryPromises = categories.map(async (categorySlug) => {
      const categoryPath = path.join(contentDir, categorySlug);
      const categoryFile = path.join(categoryPath, 'category.json');

      try {
        // Check if category.json exists
        await fs.access(categoryFile);

        // Read category data
        const categoryData = JSON.parse(await fs.readFile(categoryFile, 'utf-8'));

        // Extract machine views (games) from category
        if (categoryData.machineViews && Array.isArray(categoryData.machineViews)) {
          return categoryData.machineViews
            .filter((machineView) => machineView.key)
            .map((machineView) => ({
              key: machineView.key,
              title: machineView.title,
              category: categorySlug,
            }));
        }
      } catch (error) {
        // Silently ignore missing category files
      }

      return [];
    });

    const categoryResults = await Promise.all(categoryPromises);
    const allGames = categoryResults.flat();

    // Remove duplicates based on game key
    const uniqueGames = allGames.filter((game, index, self) => index === self.findIndex((g) => g.key === game.key));

    return uniqueGames;
  } catch (error) {
    return [];
  }
};

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://bitplay.com',
  sitemapSize: 5000,
  generateRobotsTxt: true, // (optional)
  exclude: ['/api/*', '/settings/*', '/favorites', '/verification', '/_next/', '/cdn-cgi/*'], // Exclude specific paths
  alternateRefs: [
    {
      href: 'https://bitplay.com/fr',
      hreflang: 'fr',
    },
  ],
  additionalPaths: async (config) => {
    const categories = await getCategories();
    const cachedGames = await getCachedGames();

    return [
      ...categories.map((category) => ({
        loc: `/category/${category.slug}`,
        alternateRefs: config.alternateRefs ?? [],
      })),
      ...cachedGames.map((game) => ({
        loc: `/game/${game.key}`,
        alternateRefs: config.alternateRefs ?? [],
      })),
      ...[
        'privacy-policy',
        'aml-policy',
        'terms-of-service',
        'responsible-gaming',
        'dispute-resolution',
        'fairness',
      ].map((pagePath) => ({
        loc: `/about/${pagePath}`,
        alternateRefs: config.alternateRefs ?? [],
      })),
    ];
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api',
          '/settings',
          '/favorites',
          '/verification',
          '/_next/',
          '/cdn-cgi/',
          '/*?startDate=',
          '/*&endDate=',
        ],
      },
    ],
  },
};
