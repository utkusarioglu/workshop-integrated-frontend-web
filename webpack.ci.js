require("dotenv").config();
const {
  resolve,
  plugins,
  rules,
  output,
  ciPlugins,
  ciOptimization,
} = require("./webpack.common");
const path = require("path");

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
  plugins: [...plugins, ...ciPlugins],
};
