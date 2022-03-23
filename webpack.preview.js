require("dotenv").config();
const {
  resolve,
  plugins,
  rules,
  output,
  ciPlugins,
  ciOptimization,
  devServer,
} = require("./webpack.common");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",
  entry: {
    index: path.join(__dirname, "src", "index.tsx"),
  },
  output,
  optimization: ciOptimization,
  module: {
    rules,
  },
  resolve,
  devServer,
  plugins: [...plugins, ...ciPlugins, new BundleAnalyzerPlugin()],
};
