'use strict';

module.exports = (api) => ({
  "presets": ["@babel/preset-react"],
  "plugins": [
    ["css-modules-transform", {
      "extractCss": "./css/styles.css",
      "preprocessCss": "./config/preprocessScss.js",
      "extensions": [".css", ".scss"],
      "prepend": [ "./config/prependPostcssPlugins.js" ],
      "devMode": !api.env("production"),
    }]
  ],
});
