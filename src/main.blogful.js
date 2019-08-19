/*main controller file. create knex instance in here and call ArticlesService.methods()
in here passing/injecting knex instance as argument to them.*/

require('dotenv').config();
const knex = require('knex');
const ArticlesService = require('./articles-service');

const iknex = knex(
  {
    client: 'pg',
    connection: process.env.DB_URL,
  }
)
const myArticle = {
  title: 'Snowman Fishing in HotCocoa!!!!',
  content: 'yuuuuummmmmmmmm, whooooooooooooo does not love Hot Cocoa',
  date_published: new Date()
}

ArticlesService.updateArticle(iknex, 4, myArticle);

ArticlesService.getAllArticles(iknex);
