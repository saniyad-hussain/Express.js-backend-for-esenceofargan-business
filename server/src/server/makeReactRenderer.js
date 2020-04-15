'use strict';
const Promise = require('bluebird');
const { renderToStaticNodeStream } = require('react-dom/server');

const makeReactRenderer = ({
  addDebugData,
  defaultStylesheets = [],
  defaultScripts = [],
}) => ({
  req,
  res,
}) => ({
  element,
  title,
  stylesheets = [],
  scripts = [],
}) => {
  return new Promise((resolve, reject) => {
    res.set('Content-Type', 'text/html');
    res.write(
`<!doctype html>
<html class="no-js" lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="apple-touch-icon" href="icon.png">
  ${defaultStylesheets.map(link => `<link rel="stylesheet" href="${link}">`).join('\n')}
  ${stylesheets.map(link => link.slice(0, 5) === '<link' ? link : `<link rel="stylesheet" href="${link}">`).join('\n')}
  ${defaultScripts.map(src => `<script defer src="${src}"></script>`).join('\n')}
  ${scripts.map(src => `<script defer src="${src}"></script>`).join('\n')}
</head>
<body>
  <!--[if IE]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
  <![endif]-->
`);
    const stream = renderToStaticNodeStream(element);
    stream.pipe(res, { end: false });
    addDebugData(() => [req, 'Rendered Page']);
    stream.on('end', () => {
      res.write(
`</body>
</html>`
      );
      res.end();
      resolve();
    });
    stream.on('error', error => {
      addDebugData(() => [req, 'React render stream error', error]);
      reject(error);
    });
  });
};
module.exports = makeReactRenderer;
