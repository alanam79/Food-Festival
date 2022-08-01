// webpack uses Node.js to build our application, can use npm modules and the require module.
const path = require("path");
// Because this plugin is built into webpack, be sure we're bringing webpack's methods and properties into the config file
const webpack = require("webpack");

module.exports = {
  // the entry point is the root of the bundle and beginning of the dependency graph
  entry: "./assets/js/script.js",
  //   output bundles code and sends to dist folder
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  
  // mode is the mode we run the webpack, usually "production"
  mode: "development",
};
