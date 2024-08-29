import jestSetup from './jest.setup';

declare global {
  // eslint-disable-next-line no-var
  var testLibJestUtils: typeof jestSetup;
}

export {};
