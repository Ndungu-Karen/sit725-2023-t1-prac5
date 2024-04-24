module.exports = {
    testEnvironment: 'node',
    testTimeout: 30000,
    testPathIgnorePatterns: ['./node_modules/'],
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
    verbose: true,
    testEnvironmentOptions: { "port": 4000 } // Use a different port for tests
  };
  