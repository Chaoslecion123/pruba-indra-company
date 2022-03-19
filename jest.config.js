module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    verbose: true,
    collectCoverage: true,
    setupFilesAfterEnv: [  // NOT setupFiles
      "./defaultTimeout.js"
    ],
    coveragePathIgnorePatterns: [
      "node_modules",
      "dist"
  ],
  };
  