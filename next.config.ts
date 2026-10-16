import type { NextConfig } from 'next';
import childProcess from 'child_process';

import 'dotenv/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const getBuildId = () => {
  try {
    /* The `2> /dev/null` part outputs the errors to `/dev/null`,
     * effectively suppressing the output error - otherwise an error is always
     * thrown on gitlab which might be misleading,
     * as it's not relevant in this case
     * https://stackoverflow.com/questions/19108895/what-does-the-2-mean-on-the-unix-command-line
     */
    return childProcess.execSync('git rev-parse HEAD 2> /dev/null').toString();
  } catch {
    try {
      return childProcess.execSync('cat .git/HEAD').toString();
    } catch (error) {
      return undefined;
      /* If there's ever a situation where the buildId would be `undefined` on production,
       * verify if there's a .git folder in the production build.
       * If there's no such folder, add a case to get the buildId from the env variables
       * and contact your nearest DevOps engineer to pass the commit sha to production envs.
       */
    }
  }
};

const release = process.env.CI_COMMIT_SHA ?? getBuildId();

const nextConfig = async (): Promise<NextConfig> => {
  const baseConfig: NextConfig = {
    cleanDistDir: true,
    // This is for future use, when we will remove the .babelrc file
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
      removeConsole:
        process.env.NODE_ENV === 'production'
          ? {
              exclude: ['error'],
            }
          : undefined,
    },
    productionBrowserSourceMaps: true,
    env: {},
    transpilePackages: ['lodash', 'styled-components', 'react-use-intercom', 'react-hook-form'],
    publicRuntimeConfig: {
      release,
      publicBackendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
      // when the render is made on server side,
      // we must use an different address for fetch datas (and skip cloudfare firewall)
      internalBackendUrl: process.env.NEXT_PUBLIC_BACKEND_URL_INTERNAL,
      operatorApiKey: process.env.NEXT_PUBLIC_OPERATOR_API_KEY,
      publicMachineScriptUrl: process.env.NEXT_PUBLIC_MACHINE_SCRIPT_URL, //
      nextPublicEnv: process.env.NEXT_PUBLIC_ENV,
      nodeEnv: process.env.NODE_ENV,
      casinoId: '',
      casinoKey: process.env.NEXT_CASINO_SLUG,
      coinsUrl: process.env.NEXT_PUBLIC_COINS_URL,
    },
    images: {
      minimumCacheTTL: 84600, // 1 day in seconds
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'dev.egamingchain.lan',
        },
        {
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: 'main.media-server.egamingchain.io',
        },
        {
          protocol: 'https',
          hostname: 'develop.media-server.egamingchain.io',
        },
        {
          protocol: 'https',
          hostname: 'media-server.egamingchain.io',
        },
        {
          protocol: 'https',
          hostname: '*.content.egamingchain.io',
        },
        {
          protocol: 'https',
          hostname: 'content.egamingchain.io',
        },
      ],
    },
    i18n: {
      locales: ['en', 'fr'],
      defaultLocale: 'en',
    },
    redirects: async () => [
      {
        source: '/profile/settings',
        destination: '/profile/settings/general',
        permanent: true,
      },
      {
        source: '/profile/transactions',
        destination: '/profile/transactions/deposits',
        permanent: true,
      },
    ],
    rewrites: async () => [
      {
        source: '/login',
        destination: '/?modal=login',
      },
      {
        source: '/register',
        destination: '/?modal=register',
      },
      {
        source: '/my_profile',
        destination: '/?modal=profile',
      },
      {
        source: '/my_vip',
        destination: '/?modal=vip',
      },
      {
        source: '/deposit',
        destination: '/?modal=deposit',
      },
    ],

    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                ],
              },
            },
          },
        ],
      });

      config.module.rules.push({
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'formatjs',
                  {
                    idInterpolationPattern: '[sha512:contenthash:base64:6]',
                    ast: true,
                  },
                ],
              ],
            },
          },
        ],
      });

      return config;
    },
  };

  return withBundleAnalyzer(baseConfig);
};

export default nextConfig;
