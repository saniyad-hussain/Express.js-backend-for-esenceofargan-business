'use strict';
const sass = require('sass');

module.exports = function processSass (data, filename) {
  try {
    const result = sass.renderSync({
      data: data,
      file: filename
    }).css;
    if (!result) {
      console.log(new Error(`Empty SCSS filename: ${filename}`));
    }
    return result.toString('utf8');
  } catch (error) {
    console.log(error);
    return `
body {
  border: solid 5px red !important;
}
    `;
    throw error;
  }
};
