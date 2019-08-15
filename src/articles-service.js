// put ArticlesService object in here and export

//object to contain all transaction methods CRUD for this specific table blogful_articles
const ArticlesService = {
  //Read all method
  getAllArticles(iknex){
    console.log('place all articles here');
    iknex.select('*')
    .from('blogful_articles')
    .then(res=> {
      console.log(res);
    })
  }

}











module.exports = ArticlesService;