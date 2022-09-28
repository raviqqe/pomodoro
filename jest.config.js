module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/react-spinners"],
  setupFiles: ["<rootDir>/src/setupTests.ts"],
};
