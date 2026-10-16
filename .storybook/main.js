const path = require('path');

module.exports = {
  stories: ['../app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@chromatic-com/storybook'],

  features: {
    babelModeV7: true,
  },

  staticDirs: ['../public'],

  webpackFinal: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, '../app'),
      pages: path.resolve(__dirname, '../pages'),
      public: path.resolve(__dirname, '../public/'),
      'next/router': 'next-router-mock',
    };

    // We have to exclude svg from asset/resource loader
    config.module.rules.find((rule) => rule.test && rule.test.test('.svg')).exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
