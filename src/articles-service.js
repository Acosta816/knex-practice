



const ArticlesService= {
  
  getAllArticles(iknex){
    return iknex.select('*')
    .from('blogful_articles')
    .then(res=> {
      return res;
    })
  }
}

module.exports = ArticlesService;