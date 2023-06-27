module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/unit/**/*.+(ts|js)"],
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
  collectCoverageFrom: [
    "**/src/**/*.{ts,js}",
    "!**/node_modules/**",
    "!libraries/models/**",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["lcov", "text-summary"],
  resetMocks: true,
  clearMocks: true,
  resetModules: true,
  restoreMocks: true,
};
