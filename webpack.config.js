const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "spec/index.spec.ts"),
  output: {
    filename: "index.bundle.spec.js",
    path: path.resolve(__dirname, "spec")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "webpack-espower-loader"
        }
      },
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};
