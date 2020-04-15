'use strict';
const { knexConfig } = require('../config');
module.exports = {
  ...knexConfig,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
