/* eslint-disable */
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	bail: true,
	coverageThreshold: {
		global: {
			// goal to reach 100%
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
		},
	},
	testMatch: ['**/?(*.)+(test).[jt]s'],
	testEnvironment: 'node',
	collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}?(x)'],
	collectCoverage: true,
	coverageDirectory: 'coverage',
	preset: 'ts-jest',
	moduleFileExtensions: ['ts', 'js', 'json'],
	verbose: false,
};

export default config;
