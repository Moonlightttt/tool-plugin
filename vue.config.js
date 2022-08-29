const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

// Generate pages object
const pagesObj = {};

const chromeName = ["popup", "options"];

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: "public/index.html",
    filename: `${name}.html`
  };
});

const isProduction = process.env.NODE_ENV === "production";

const plugins = isProduction
  ? [
    {
      from: path.resolve("src/manifest.production.json"),
      to: `${path.resolve("dist")}/manifest.json`
    }
  ]
  : [
    {
      from: path.resolve("src/manifest.development.json"),
      to: `${path.resolve("dist")}/manifest.json`
    }
  ];

plugins.push({
  from: path.resolve("src/css/hide-hupu-title.css"),
  to: `${path.resolve("dist")}/css/hide-hupu-title.css`
});

plugins.push({
  from: path.resolve("src/css/hide-zhihu-title.css"),
  to: `${path.resolve("dist")}/css/hide-zhihu-title.css`
});

module.exports = {
  pages: pagesObj,
  configureWebpack: {
    plugins: [CopyWebpackPlugin(plugins),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
    devtool: isProduction ? false : "inline-source-map",
  }
};
