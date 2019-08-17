//write the tests in here
const ArticlesService = require('../src/articles-service'); //require service object
const knex = require('knex');

describe('MasterTestSuite: ArticlesService Object', ()=> {

  //create knexTest instance and link to test database knex-practice-TEST
  let iknexTest;
  let articlesTest = [
    {
     id: 1,
     date_published: new Date('2029-01-22T16:28:32.615Z'),
      title: 'First test post!',
      content: 'bllllllllllllaaaaaaaaaaaahhhhh blaahh blaaahhh'
    },
    {
      id: 2,
      date_published: new Date('2029-01-22T16:28:32.615Z'),
      title: 'Second test post!',
      content: 'zzzzzzzz zzzzzz zzzzzzz zzzzzzzzzzzzzz'
    },
    {
      id: 3,
      date_published: new Date('2029-01-22T16:28:32.615Z'),
      title: 'Third test post!',
      content: 'wowowowowowowowowow wowooow wowoow'
    },
  ]



  before( ()=> {

    iknexTest = knex(
      {
        client: 'pg',
        connection: process.env.TEST_DB_URL,
      }
    )

  });

  /*before ANY tests begin, clean up the accumulated mess (left over/ inserted data) of last run. 
  This does not clean up after each individual test since individual tests will runn one after another 
  without stopping. This before() only happens at the begining once before ANY tests begin and 
  does not clean up again after the first test has started, so the second test will deal with 
  the first one's mess and the third will deal with the 1st and second's mess and so on. 
  This is why we need a cleanup crew "truncate()" inside of an afterEach() block */
  before( ()=> {
    iknexTest('blogful_articles').truncate();
  });

  //following each individual test, a clean up of the data in the table will occur.
  afterEach( ()=> {
    iknexTest('blogful_articles').truncate();
  })


  //destroy database connection after tests finish so it doesnt hang.   ...(This is because we have an open database connection and the Node process thinks the script will want to stay running whilst the connection is open!)
  after( ()=> {
    iknexTest.destroy();
  });


//------------------------------------------------------------------Tests BEGIN

/************** TestSuite#1  Start ***********/
  context('TestSuite: ArticlesService.getAllArticles() WITH DATA in "blogful_articles table" ',()=>{

  // before ANY tests in this context/describe run at all, we will seed the table with test data
  before( ()=> {

    return iknexTest
      .insert(articlesTest)
      .into('blogful_articles')

  });

    it('Test#1: resolves all article entries from "blogful_articles" table', ()=> {
      return ArticlesService.getAllArticles(iknexTest)
        .then(res=> {
          console.log('res = ', res);
          expect(res).to.eql(articlesTest);
        })
    })

  })
/************** TestSuite#1  Over ***********/


/************** TestSuite#1  Start ***********/
  context('TestSuite: ArticlesService.getAllArticles() with NO DATA in "blogful_articles" table', ()=>{

    it('Test#1: ArticlesService.getAllArticles() resolves an EMPTY array', ()=> {
      return ArticlesService.getAllArticles(iknexTest)
        .then(res=> {
          expect(res).to.eql([])
        });
    })

  })
/************** TestSuite#1  Over ***********/


//------------------------------------------------------------------Tests END


})