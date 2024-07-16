module.exports = {
  verbose: true,
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/jest-transform-esm.js',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/'
  ]
};
