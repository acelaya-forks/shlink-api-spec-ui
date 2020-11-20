const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = withFonts(withCSS({
  trailingSlash: true, // Makes pages to be exported as index.html files
  webpack(config) {
    config.optimization.minimizer = config.optimization.minimizer || [];
    config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

    return config;
  },
}));
