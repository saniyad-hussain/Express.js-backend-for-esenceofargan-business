'use strict';
const Promise = require('bluebird');
exports.up = async knex => {
  const existing = (await Promise.map(
    ['user'],
    tableName => knex.schema.hasTable(tableName).then(exists => ({ tableName, exists }))
  ))
    .filter(({ exists }) => exists)
    .map(({ tableName }) => tableName);
  if (existing.length) {
    throw new Error(`These tables already exists: "${existing.join('", "')}"`);
  }
  await knex.schema.createTable('user', table => {
    table.uuid('id').primary();
    table.text('name').notNullable();
    table.text('email').notNullable();
    table.text('password');
    table.timestamps(true, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('user');
  return undefined;
};
