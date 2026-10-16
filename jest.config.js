const nextJest = require('next/jest');

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' });

// Any custom config you want to pass to Jest
const customJestConfig = {
  rootDir: './',
  collectCoverageFrom: ['app/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'app/core/constants',
    'app/themes/globalStyles.ts',
    'app/utils/storybook.ts',
    '(app/)(.*)(/interfaces)',
    '(app/)(.*)(Atoms)',
    '(app/)(.+)(stories.tsx)',
    '(app/)(.+)(styles.ts)',
  ],
  coverageReporters: ['text', 'cobertura'],
  moduleNameMapper: {
    '^date-fns/locale$': '<rootDir>/__mocks__/date-fns/locale.js',
    '@/(.*)': '<rootDir>/app/$1',
    'mocks/(.*)': '<rootDir>/__mocks__/$1',
    'tests/(.*)': '<rootDir>/__tests__/$1',
  },
  reporters: ['default', ['jest-junit', { outputDirectory: 'coverage' }]],
  roots: ['<rootDir>/app'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transformIgnorePatterns: ['/node_modules/(?!axios).+\\.js$'],
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
