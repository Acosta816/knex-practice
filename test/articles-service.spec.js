/* (file containing tests for all ArticlesService methods.)
This file mimics the code for the main.blogful.js to give us a testing environment.
We dont want this code mutating our ACTUAL database, so we will link the knex inst's
"connection" to a knex-practice-TEST database with a clone of our blogful_articles table inside.   */

require('dotenv').config(); 
const knex = require('knex');
ArticlesService = require('../src/articles-service');

const iknex = knex(
  {
    client: 'pg',
    connection: process.env.TEST_DB_URL,
  }
)

const testArticles = [
  { id: 1,
    title: 'Sonic Gems, a lost trearure',
    date_published: new Date('2029-01-22T16:28:32.615Z'),
    content: 'ssssssooooonnnnnnniiiiccc iiissss ssoooooo cooooollll' },
  { id: 2,
    title: 'Ice Caverns Spelunking',
    date_published: new Date('2029-01-22T16:28:32.615Z'),
    content: 'gogogogogog gogogo gogogogo gogogog ogogog ogogg ogogoggogogg' },
  { id: 3,
    title: 'Snowy Peaks of Sweden',
    date_published: new Date('2029-01-22T16:28:32.615Z'),
    content: 'yuuuuuuuuuuuuum tum yum yum yumy uy muymuymuymy uy yuymyumuymuy uym' },
  { id: 4,
    title: 'Fishing with Hot Cocoa',
    date_published: new Date('2029-01-22T16:28:32.615Z'),
    content: 'Snowmen finshishihsidnf nsiduhf  sndnfundsi hnisdubnsiudfis' },
  { id: 5,
    title: 'Emerald Coast',
    date_published: new Date('2029-01-22T16:28:32.615Z'),
    content: 'beachchyyy getawayyyy sdaf;lkj loooooooooooooooooooooookkkkk tttttrreeaaassuurreee' }
]



/*************************************************************** end of setup */

describe('MASTER_TestSuite: ArticlesService', ()=> {

  //for good measure, wipe any data that might be leftover in blogful_articles table
  before( ()=> iknex('blogful_articles').truncate() );

  //after all below tests hav run, destroy knex-practice-TEST database connection so it doesn't hang.  ...(This is because we have an open database connection and the Node process thinks the script will want to stay running whilst the connection is open!)
  after( ()=> iknex.destroy() );

/*-------------------------TESTING BEGINS------------------------------------ */ 

  context('TestSuite#1: getAllArticles() WITH DATA in "blogful_articles"', ()=> {

    //inject test data into table
    beforeEach( ()=> iknex.insert(testArticles).into('blogful_articles') );
    //wipe test data from table
    afterEach( ()=> iknex('blogful_articles').truncate() );

    //test1
    it('spec#1: Should resolve all articles from "blogful_articles"', ()=> {
      return ArticlesService.getAllArticles(iknex)
        .then(res=> {
          expect(res).to.eql(testArticles);
        })
    })

  })

  context('TestSuite#1.5: getAllArticles() with NO data in "blogful_articles"', ()=> {

    it('spec#1 should resolve empty array', ()=> {
      return ArticlesService.getAllArticles(iknex)
        .then(res=> {
          expect(res).to.eql([])
        })
    })

  })

  context('TestSuite#2: getbyId()', ()=> {

    //inject test data into table
    beforeEach( ()=> iknex.insert(testArticles).into('blogful_articles') );
    //wipe test data from table
    afterEach( ()=> iknex('blogful_articles').truncate() );

    it('spec#1: should resolve article with specified id from "blogful_articles"', ()=> {
      //choose an article to test from testArticles
      const thisArticle = testArticles[1];

      return ArticlesService.getById(iknex, 2)
        .then(res=> {
          console.log(res);
          console.log('VERSUS');
          console.log(thisArticle);
          expect(res).to.eql(thisArticle)
        })

    })

  })

  context('TestSuite#3: addArticle() with NO data in "blogful_articles"', ()=> {
    //make an article to test adding it in.
    const myArticle = 
    {
      title: "Megaman's New Game",
      date_published: new Date('2020-01-01T00:00:00.000Z'),
      content: "mega has a neew game coming in 2021 just in time for the tokyo olympics..."
    }

    //make expected version of article with id added
    const expectedArticle = {
      id: 1,
      title: "Megaman's New Game",
      date_published: new Date('2020-01-01T00:00:00.000Z'),
      content: "mega has a neew game coming in 2021 just in time for the tokyo olympics..."
    }

    //wipe test data from table
    afterEach( ()=> iknex('blogful_articles').truncate() );

    it('spec#1: should insert given article and resolve article with added "id"', ()=> {
      return ArticlesService.addArticle(iknex, myArticle)
        .then(res=> {
          expect(res).to.eql(expectedArticle)
        })
    })

  })

  context('TestSuite#4: removeById()', ()=> {
    //establish what your table would look like with the article REMOVED.
    const expectedTable = testArticles.filter(article=> article.id !== 2);
    
    //inject test data into table
    beforeEach( ()=> iknex.insert(testArticles).into('blogful_articles') );
    //wipe test data from table
    afterEach( ()=> iknex('blogful_articles').truncate() );

    it('spec#1: removes article by given "id" from "blogful_articles"', ()=> {
      return ArticlesService.removeById(iknex, 2)
        .then(()=> ArticlesService.getAllArticles(iknex))
        .then(res=> {
          console.log(res);
          expect(res).to.eql(expectedTable);
        })
    })

  })

  context('TestSuite#5: updateArticle()', ()=> {

    //make some changes you would like to overwrite with
    const updates = 
    {
      title: '☃️Snowman Fishing in HotCocoa☕️',
      content: '😋yuuuuummmmmmmmm, whooooooooooooo does not love Hot Cocoa'
    }
    
    //make an updated version of the article to see if the method spits out the same thing
    const updatedArticle =
    {
      id: 4,
      title: '☃️Snowman Fishing in HotCocoa☕️',
      date_published: new Date('2029-01-22T16:28:32.615Z'),
      content: '😋yuuuuummmmmmmmm, whooooooooooooo does not love Hot Cocoa'
    }

    //inject test data into table
    beforeEach( ()=> iknex.insert(testArticles).into('blogful_articles') );
    //wipe test data from table
    afterEach( ()=> iknex('blogful_articles').truncate() );

    it('spec#1: updates an article from "blogful_articles"', ()=> {
      return ArticlesService.updateArticle(iknex, 4, updates)
        .then(()=> ArticlesService.getById(iknex,4))
        .then(res=> {
          expect(res).to.eql(updatedArticle)
        })
    })

  })

/*-------------------------TESTING ENDS------------------------------------ */ 

});  //end of MASTER_TestSuite

