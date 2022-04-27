module.exports = {
  clearMocks: true,
  // resetMocks: false,
  // resetModules: false,
  // restoreMocks: false,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/types',
    'src/__tests__',
    'src/server.ts',
    'src/swagger.json',
    'src/database',
    'src/config',
    'src/database/migrations',
    'src/database/seeders'
  ],
  // transformIgnorePatterns: ['node_modules'],
  // watchPathIgnorePatterns: ['node_modules'],
  // modulePathIgnorePatterns: ['node_modules'],
  testPathIgnorePatterns: ['node_modules', 'src/__tests__/*.ts'],
  // testMatch: ['.(spec|test).(js|ts)$'],
  // testRegex: ['test/**/*.(spec|test).(js|ts)'],
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  preset: 'ts-jest',
  testEnvironment: 'node'
};
