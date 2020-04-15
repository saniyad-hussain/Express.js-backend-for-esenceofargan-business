'use strict';
const genId = require('uuid/v4');

module.exports = function (app, config, debug) {
  if (!debug) {
    return function () {}; // eslint-disable-line no-empty-function
  }
  console.log('Running in debug mode. Get list of previous requests at `<serverRoot>/__debug`');

  const requestData = new Map();

  const requestProperties = [
    'baseUrl',
    'body',
    'cookies',
    'fresh',
    'hostname',
    'ip',
    'ips',
    'method',
    'originalUrl',
    'params',
    'path',
    'protocol',
    'query',
    'route',
    'secure',
    'session',
    'signedCookie',
    'stale',
    'subdomains',
    'xhr',
    '_reqDebugId',
  ];
  function getSerializableRequest (req) {
    return requestProperties.reduce((request, propName) => {
      request[propName] = req[propName];
      return request;
    }, {});
  }

  const missingRequestError =
`addDataToRequest must be passed either an OBJECT with "req" and "label" properties
(and optional "data" property), or a FUNCTION which returns an ARRAY of
[Request, label, data].
`;

  function addDataToRequest (req, label, data) {
    if (!req) {
      throw new Error(
        'addDataToRequest must be passed either an object ({ req, label, data }) or a function returning [Request, label, data]'
      );
    }
    // console.log('Debug call', getSerializableRequest(req), label, data);
    if (requestData.has(req._reqDebugId)) {
      const dataset = [...requestData.get(req._reqDebugId), JSON.stringify({ label, data }, null, 2)];
      requestData.set(req._reqDebugId, dataset);
    } else {
      const dataset = [JSON.stringify({
        label: 'request',
        request: getSerializableRequest(req),
      }, null, 2)];
      if (label || data) {
        dataset.push(JSON.stringify({ label, data }, null, 2));
      }
      requestData.set(req._reqDebugId, dataset);
    }
  }
  function addDebugData (update) {
    if (typeof update === 'function') {
      const args = update();
      if (!args[0]._reqDebugId) {
        throw new Error(missingRequestError);
      }
      addDataToRequest(...args);
    } else {
      if (!update.req || !update.req._reqDebugId) {
        throw new Error(missingRequestError);
      }
      addDataToRequest(update.req, update.label, update.data);
    }
  }

  app.use((req, res, next) => {
    req._reqDebugId = genId();
    const host = `${req.protocol}://${req.get('host')}/__debug/${req._reqDebugId}`;
    res.set('X-request-debug-url', host);
    // res.set('X-request-debug-url', `http://localhost:${config.securePort || config.port}/__debug/${req._reqDebugId}`);
    addDebugData({ req, label: 'requestStartTimestamp', data: Date.now() });
    if (requestData.size > 50) {
      const deleteCount = requestData.size - 50;
      Array.from(requestData.keys()).some((key, index) => {
        if (index > deleteCount) {
          return true;
        }
        requestData.delete(key);
        return false;
      });
    }
    next();
  });
  app.get('/__debug/:reqDebugId', (req, res) => {
    // Could implement an origin check here to only allow known hosts (or localhost)
    // to read debug info.
    // console.log('requestData', Array.from(requestData.entries()).map(([key, items]) => ({ key: key.path, items })));
    const debugData = requestData.get(req.params.reqDebugId);
    res.status(debugData ? 200 : 404);
    res.json({
      debugData: debugData.map(d => JSON.parse(d)),
    });
  });
  app.get('/__debug', (req, res) => {
    // Could implement an origin check here to only allow known hosts (or localhost)
    // to read debug info.
    // console.log('requestData', Array.from(requestData.entries()).map(([key, items]) => ({ key: key.path, items })));
    res.json({
      debugList: Array.from(requestData.entries()).map(([reqDebugId, storedDataSet]) => {
        const dataSet = storedDataSet.map(d => JSON.parse(d));
        const request = dataSet[0].request;
        const host = `${req.protocol}://${req.get('host')}/__debug/${req._reqDebugId}`;
        return {
          reqDebugId,
          requestDetails: host,
          // requestDetails: `http://localhost:${config.port}/__debug/${reqDebugId}`,
          path: request.path,
          method: request.method,
          timestamp: dataSet.find(({ label }) => label === 'requestStartTimestamp').data,
          entries: dataSet.length,
        };
      }),
    });
  });
  return addDebugData;
};
