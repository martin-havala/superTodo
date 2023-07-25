module.exports = {
  preset: "jest-preset-angular",
  collectCoverage: true,
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
