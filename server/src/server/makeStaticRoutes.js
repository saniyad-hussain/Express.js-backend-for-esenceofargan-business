'use strict';

const makeStaticRoutes = (fileRoot) => ({ router, addDebugData }) => {
  router.get(/\/[\w-]{36}/, async (req, res, next) => {
    if (!req.accepts('html')) {
      next();
      return;
    }
    const options = {
      root: fileRoot,
      dotfiles: 'deny',
    };
    return new Promise((resolve, reject) => {
      res.sendFile('index.html', options, error => {
        if (error) {
          addDebugData(() => [req, 'Failed to send index file', error]);
          res.end();
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });
  const express = require('express');
  router.use(express.static(fileRoot));
  return router;
};
module.exports = makeStaticRoutes;
