module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/integration/**/*.+(ts|js)"],
  transform: {
    "^.+\\.[t|j]s$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.base.json",
      },
    ],
  },
  moduleNameMapper: { "^@library/(.*)$": "<rootDir>/libraries/$1/src" },
  modulePathIgnorePatterns: ["dist"],
  globalSetup: "<rootDir>/dotenv.js",
  testTimeout: 30000,
};
