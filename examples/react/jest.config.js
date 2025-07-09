module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["./src/test/setup.js"],
    moduleFileExtensions: ['js', 'jsx'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.(js|jsx)',
        '<rootDir>/src/**/?(*.)(test|spec).(js|jsx)'
    ],
    collectCoverageFrom: [
        'src/**/*.(js|jsx)',
        '!src/index.js',
        '!**/node_modules/**',
        '!**/__tests__/**'
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
};
