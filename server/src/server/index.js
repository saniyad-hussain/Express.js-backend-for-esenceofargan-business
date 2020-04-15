'use strict';

const express = require('express');
// const Promise = require('bluebird');
const session = require('express-session');
const csrf = require('csurf');
const KnexSessionKnex = require('connect-session-knex');
const helmet = require('helmet');
const debuggingData = require('./debuggingData');
const makeStaticRoutes = require('./makeStaticRoutes');
const makeReactRenderer = require('./makeReactRenderer');

/**
 * @typedef Config
 * @property {Object} knexConfig
 * @property {string} secret
 * @property {number} port
 * @property {number} securePort
 * @property {string} tlsCert
 * @property {string} tlsKey
 */

module.exports = function ({ getRoutes, secret, knex, debug = false }) {
  const app = express();

  // Body parsing
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(helmet());

  // Session setup
  const KnexSessionStore = KnexSessionKnex(session);
  const store = new KnexSessionStore({ knex });
  app.use(
    session({
      cookie: {
        httpOnly: true,
        secure: debug ? false : true,
        sameSite: 'lax',
      },
      secret: secret,
      resave: false,
      saveUninitialized: false,
      store,
    })
  );

  const addDebugData = debuggingData(app, {}, debug);

  app.use((req, res, next) => {
    if (debug) {
      req.knex = knex.withUserParams({ req });
      req.knex.on('query-error', (error, queryData) => {
        addDebugData({
          req,
          label: 'KNEX QUERY ERROR',
          data: ['method', 'sql', 'bindings', 'options'].reduce((obj, prop) => {
            obj[prop] = queryData[prop];
            return obj;
          }, {}),
        });
      });
      req.knex.on('query-response', (response, queryData) => {
        addDebugData({
          req,
          label: 'KNEX QUERY',
          data: ['method', 'sql', 'bindings', 'options', 'context'].reduce((obj, prop) => {
            obj[prop] = queryData[prop];
            return obj;
          }, {
            response,
          }),
        });
      });
    } else {
      req.knex = knex;
    }
    next();
  });

  // CSRF handling
  app.use(csrf({
    value: req => {
      if (req.get('Content-Type') === 'application/x-www-form-urlencoded') {
        console.log('form-urlencoded csrf token', req.body.csrf_token);
        return req.body.csrf_token;
      }
      return req.get('csrf-token');
    },
  }));
  app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {
      return next(err);
    }
    res.set('csrf-token', req.csrfToken());
    res.status(403);
    res.send({
      csrfFailure: true,
      error: 'Looks like your session may have expired. Please refresh and try again.',
    });
  });
  app.use(function (req, res, next) {
    res.set('csrf-token', req.csrfToken());
    next();
  });

  // App routes
  const routers = getRoutes({
    app,
    addDebugData,
  });
  if (Array.isArray(routers)) {
    routers.forEach((router, index) => {
      try {
        app.use(router);
      } catch (error) {
        console.log(`Route [${index}] returned by getRoutes was not a valid router.`, error);
        throw error;
      }
    });
  } else {
    app.use(routers);
  }

  // Simple logout/session end handler
  app.post('/logout', (req, res) => {
    addDebugData({ req, label: 'logout request' });
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({
          error: 'Something went wrong, but you can safely logout by clearing cookies for this site.',
        });
        addDebugData({ req, label: 'logout request failed' });
      } else {
        res.json({
          message: 'You are now logged out.',
        });
        addDebugData({ req, label: 'logout completed' });
      }
    });
  });

  // Simple 404 handler
  app.use((req, res) => {
    addDebugData({ req, label: 'default 404 handler' });
    res.sendStatus(404);
  });

  // Handle application error.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    addDebugData(() => ([req, 'server error', err]));
    console.log(err);
    if (!res.headersSent) {
      res.status(500);
      if (req.accepts('html')) {
        res.send('Something went wrong. Please refresh and try again.');
        return;
      }
      res.json({
        status: 'error',
        payload: {
          error: 'Something went wrong processing your request, please try again.',
        },
      });
    }
    if (!debug) {
      console.log('Forcing graceful shutdown!');
      app.close();
    } else {
      console.log('Forcing graceful shutdown skipped for DEBUG!');
    }
  });

  return { app, knex };
};

Object.assign(module.exports, {
  makeStaticRoutes,
  makeReactRenderer,
});
