import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo test.env
dotenv.config({ path: '.env' });

export default {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverage: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.(t|j)s'],
	coverageReporters: ["json", "html", "text", 'lcov'],
	testEnvironment: 'node',
};
