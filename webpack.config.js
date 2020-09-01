const path = require("path");

function scriptRules() {
  return [
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: "babel-loader",
      options: { presets: ["@babel/preset-env"] },
    },
  ];
}

module.exports = {
  mode: "development",
  entry: "./resources/assets/src/app.js",
  output: {
    path: path.resolve(__dirname, "public", "js"),
    filename: "react_bundle.js",
  },
  module: {
    rules: scriptRules(),
  },
};
