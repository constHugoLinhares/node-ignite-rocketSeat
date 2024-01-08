
module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  'parserOptions': {
    'sourceType': 'module',
  },
  'root': true,
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-undef': 'off',
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',
    'promise/async-await-error-handling': 'off',
    
    'comma-dangle': ['error', 'always-multiline'],
  },
  'plugins': ['promise', '@typescript-eslint'],
};
