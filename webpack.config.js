const path = require(`path`);
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  devtool: `source-map`,
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
