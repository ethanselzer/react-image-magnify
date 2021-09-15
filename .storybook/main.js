const { plugins } = require('../webpack.config.js');
const webpack = require('../webpack.config.js');

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  typescript: {
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: (config) => ({
      ...config,
      // module: { ...config.module, rules: webpack.module.rules },
      resolve: { ...config.resolve, plugins: webpack[0].resolve.plugins },
    }),
};
