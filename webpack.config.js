// webpack uses Node.js to build our application, can use npm modules and the require module.
const path = require("path");
// Because this plugin is built into webpack, be sure we're bringing webpack's methods and properties into the config file
const webpack = require("webpack");
// import webpack bundle-analyzer
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // the entry point is the root of the bundle and beginning of the dependency graph
  entry: "./assets/js/script.js",
  //   output bundles code and sends to dist folder
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.bundle.js",
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    // will analyze our bundle sizes to see how much JavaScript is being processed by the browser
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the static requires a report to output to an report.HTML file in the dist folder, 
      // can also set to disable to temporarily stop the reporting and automatic opening of the report
    }),
  ],
  // mode is the mode we run the webpack, usually "production"
  mode: "development",
};
