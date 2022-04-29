module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/types',
    'src/__tests__',
    'src/server.ts',
    'src/app.ts',
    'src/swagger.json',
    'src/database',
    'src/config',
    'src/database/migrations',
    'src/database/seeders'
  ],
  testPathIgnorePatterns: [
    'node_modules',
    'src/__tests__/generateMock.ts',
    'src/__tests__/populateTheDatabase.ts'
  ],
  transformIgnorePatterns: ['node_modules'],
  watchPathIgnorePatterns: ['node_modules'],
  preset: 'ts-jest',
  testEnvironment: 'node'
};
