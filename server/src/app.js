'use strict';
const Knex = require('knex');
const server = require('./server');
const debug = process.env.NODE_ENV === 'development';
const Mailer = require('./mailer');
const userRoutes = require('./user');
const loginRoute = require('./login');
const { static: staticMiddleware } = require('express');
const makeRouter = require('express-promise-router');
const config = require('../../config');
const appSchema = require('./pages');

const knex = Knex(config.knexConfig);
const mailer = Mailer();

const services = req => ({
  knex: req.knex,
  mailer,
});

// knex.on('query-response', (response, queryData) => {
//   console.log('KNEX QUERY', {
//     label: 'KNEX QUERY',
//     data: ['method', 'sql', 'bindings', 'options', 'context'].reduce((obj, prop) => {
//       obj[prop] = queryData[prop];
//       return obj;
//     }, {
//       response,
//     }),
//   });
// });

const appRoutes = function ({ router }) {
  appSchema.pages.forEach(page => {
    if (page.route) {
      const {
        path,
        label,
        route,
      } = page;
      router.get(path, async (req, res) => {
        req.context.addDebugData(() => [req, 'Rendering', { path, label }]);
        return route(req, res);
      });
    }
  });
  return router;
};

const mockApiRoutes = function ({ router }) {
  router.use(['/api/mock/:res', '/api/mock'], (req, res) => {
    if (req.params.res) {
      res.status(+req.params.res);
      res.json({ error: 'Mock error' });
      return;
    }
    res.json(req.body || { success: true });
  });
  return router;
};

const notFoundRoutes = function ({ router }) {
  router.use((req, res, next) => {
    if (!req.accepts('html')) {
      next();
      return;
    }
    req.context.addDebugData(() => [req, 'Rendering 404 not found page', {}]);
    return appSchema.notFoundPage.route(req, res);
  });
  return router;
};

function getRoutes ({ addDebugData }) {
  const makeRequestRender = server.makeReactRenderer({
    addDebugData,
    defaultStylesheets: ['/css/styles.css'],
    defaultScripts: ['/assets/js/main.js'],
  });
  const router = makeRouter();
  [
    ({ router }) => {
      router.use((req, res, next) => {
        req.context = {
          services: services(req),
          appSchema,
          addDebugData,
          render: makeRequestRender({ req, res }),
        };
        next();
      });
    },
    userRoutes,
    loginRoute,
    appRoutes,
    mockApiRoutes,
    ({ router }) => {
      router.use('/css', staticMiddleware(__dirname + '/../css'));
      router.use('/assets/js', staticMiddleware(__dirname + '/../../client/dist'));
      router.use('/assets', staticMiddleware(__dirname + '/../assets'));
      return router;
    },
    // server.makeStaticRoutes(__dirname + '/../../static/'),
    notFoundRoutes,
  ].forEach(route => route({ router }));
  return router;
}

const { app } = server({
  getRoutes,
  secret: config.secret,
  knex,
  debug,
});

module.exports = { app };
