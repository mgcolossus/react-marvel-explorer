const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
  mode: "development",
  devServer: {
    publicPath: "/",
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  devtool: "cheap-module-source-map",
  plugins: [new ReactRefreshWebpackPlugin()],
};
