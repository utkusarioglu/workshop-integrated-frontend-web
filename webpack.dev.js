require("dotenv").config();
const {
  resolve,
  plugins,
  rules,
  output,
  devServer,
} = require("./webpack.common");
const path = require("path");
const {
  SourceMapDevToolPlugin,
  HotModuleReplacementPlugin,
} = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, "src", "index.tsx"),
  devtool: "source-map",
  output: {
    ...output,
    sourceMapFilename: "[name].[contenthash].js.map",
  },
  module: {
    rules,
  },
  devServer,
  resolve,
  plugins: [
    ...plugins,
    new BundleAnalyzerPlugin(),
    new HotModuleReplacementPlugin(),
    new SourceMapDevToolPlugin({}),
  ],
};
