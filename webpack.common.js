const TsConfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotEnvWebpack = require("dotenv-webpack");
const { ProvidePlugin } = require("webpack");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const output = {
  filename: "[name].[contenthash].js",
  path: path.join(__dirname, "build"),
  clean: true,
};

const rules = [
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    include: ["src", "../hooks/src"].map((src) => path.join(__dirname, src)),
    // include: path.join(__dirname, "src"),
  },
  {
    test: /\.jsx?$/,
    include: path.join(__dirname, "src"),
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      },
    },
  },
];

const resolve = {
  extensions: [".tsx", ".js", ".ts"],
  plugins: [new TsConfigPathsWebpackPlugin.TsconfigPathsPlugin()],
  // required by walletconnect/web3-provider
  fallback: {
    os: require.resolve(`os-browserify/browser`),
    https: require.resolve(`https-browserify`),
    http: require.resolve(`stream-http`),
    stream: require.resolve(`stream-browserify`),
    util: require.resolve(`util/`),
    url: require.resolve(`url/`),
    assert: require.resolve(`assert/`),
    crypto: require.resolve(`crypto-browserify`),
  },
};

const plugins = [
  new HtmlWebpackPlugin({
    title: "sumer",
    template: path.join(__dirname, "public", "index.html"),
  }),
  new DotEnvWebpack(),
  new ProvidePlugin({
    // required by walletconnect web3provider and client v1
    process: "process/browser",
    // required by walletconnect v1
    Buffer: ["buffer", "Buffer"],
  }),
];

const ciPlugins = [
  new CompressionPlugin({
    compressionOptions: {
      level: 5,
    },
  }),
];

const devServer = {
  open: false,
  client: {
    overlay: false,
  },
  port: process.env.PORT || 80,
  historyApiFallback: true,
};

const ciOptimization = {
  splitChunks: {
    chunks: "all",
    // minSize: 20000,
    // minRemainingSize: 0,
    // minChunks: 1,
    // maxAsyncRequests: 30,
    // maxInitialRequests: 30,
    // enforceSizeThreshold: 50000,
    cacheGroups: {
      otel: {
        test: /node_modules\/@opentelemetry/,
        name: "otel",
      },
      walletconnect: {
        test: /node_modules\/@walletconnect/,
        name: "walletconnect",
      },
      react: {
        test: /node_modules\/react.*/,
        name: "react",
      },
      ethers: {
        test: /node_modules\/@ethersproject/,
        name: "ethers",
      },
      mui: {
        test: /node_modules\/@mui/,
        name: "mui",
      },
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
        name: "vendors",
      },
      //   default: {
      //     minChunks: 2,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //     name: "main",
      //   },
    },
  },
};

module.exports = {
  output,
  rules,
  resolve,
  plugins,
  ciPlugins,
  devServer,
  ciOptimization,
};
