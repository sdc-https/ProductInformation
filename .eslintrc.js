/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

// module.exports = {
//   extends: './node_modules/eslint-config-hackreactor/index.js',
//   "env": {
//     "jest/globals": true
//   }
// };

module.exports = {
  extends: './node_modules/eslint-config-hackreactor/index.js',
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 8
  }
};
