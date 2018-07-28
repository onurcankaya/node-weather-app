const config = require('@rise-digital/eslint-config-rise')
module.exports = config({
  rules: {
    'rule/to-disable': 0,
  },
  env: {
    node: true,
  },
  globals: {
    logger: true,
  }
})