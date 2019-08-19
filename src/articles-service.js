//create ArticlesService object for table blogful_articles containing all CRUD methods
//ArticlesService encapsulates all crud transaction methods for a single table.

//just for convinience
const ba = 'blogful_articles';

const ArticlesService = {
  

  getAllArticles(iknex){
    return iknex
      .select('*')
      .from(ba)
  }
  ,
  getById(iknex, id){
    return iknex
      .select('*')
      .from(ba)
      .where('id', id)
      .first()
  }
  ,
  addArticle(iknex, newArticle){
    return iknex
      .insert(newArticle)
      .into(ba)
      .returning('*')
      .then(res=> {
        return res[0]
      })
  }
  ,
  removeById(iknex, id){
    return iknex(ba)
    .where({ id })
    .delete()
  }
  ,
  updateArticle(iknex, id, updatedValues){
    return iknex(ba)
      .where({ id })
      .update(updatedValues)
      
      
  }


}


module.exports = ArticlesService;