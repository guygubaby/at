module.exports = {
  roots: [
    '<rootDir>/test',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^core$': '<rootDir>/packages/core/src/index.ts',
    '^@foo/(.*)$': '<rootDir>/packages/$1/src/index.ts',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/playground/',
  ],
}
