const CopyWebpackPlugin = require("copy-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const path = require("node:path");
const sourceMapSupport = require("source-map-support");

sourceMapSupport.install({ environment: "node" });

module.exports = function compile(option) {
  return {
    ...option,
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2"
    },
    mode: ["development", "staging", "production"].includes(process.env.NODE_ENV) ? "production" : "development",
    target: "node",
    devtool: "source-map",
    optimization: {
      ...option.optimization,
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            ecma: 2022,
            keep_classnames: true,
            keep_fnames: true
          }
        })
      ]
    },
    plugins: [
      ...option.plugins,
      new ESLintWebpackPlugin({
        cache: false,
        extensions: ["js", "ts"]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "environments",
            to: "environments"
          },
          {
            from: "resources",
            to: "resources"
          }
        ]
      }),
      new DotenvWebpackPlugin({
        systemvars: true,
        silent: true
      })
    ]
  };
};
