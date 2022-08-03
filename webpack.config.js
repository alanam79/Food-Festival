// webpack uses Node.js to build our application, can use npm modules and the require module.
const path = require("path");
// Because this plugin is built into webpack, be sure we're bringing webpack's methods and properties into the config file
const webpack = require("webpack");
// import webpack bundle-analyzer
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// plugin to create our web manifest
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  // the entry point is the root of the bundle and beginning of the dependency graph
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  //   output bundles code and sends to dist folder
  output: {
    // due to bundling, the entry object will be used in place of [name], for example, events
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  // file loader
  module: {
    rules: [
      {
        // object identifies the type of files to pre-process
        test: /\.jpg$/i,
        use: [
          {
            // where the actual loader is implemented - file loader must be before image-webpack-loader (optimizer for size)
            loader: "file-loader",
            // returns the name of the file with the file extension
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              // function that changes our assignment URL by replacing the ../ from our require() statement with /assets/
              publicPath: function (url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            // optimizer to reduce image size
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
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
    // manifest plugin
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("assets/img/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ],
  // mode is the mode we run the webpack, usually "production"
  mode: "development",
};
