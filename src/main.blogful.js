require('dotenv').config;
const knex = require('knex');
const ArticlesService = require('./articles-service');

const iknex = knex(
  {
    client: 'pg',
    connection: process.env.DB_URL,
  }
)