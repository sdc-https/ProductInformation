module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  //collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/styles'
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['html'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/test/CSSStub.js'
  },

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [],
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  //  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // Indicates whether each individual test should be reported during the run
  verbose: true
};