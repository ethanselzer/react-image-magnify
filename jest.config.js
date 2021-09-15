const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

delete compilerOptions.paths['dist/*'];

module.exports = {
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__', '<rootDir>/dist'],
    preset: 'ts-jest/presets/js-with-ts',
    reporters: ['default', 'jest-junit'],
    setupFilesAfterEnv: ['<rootDir>jest/setupTests.js'],
};
