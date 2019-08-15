require('dotenv').config();
const knex = require('knex');

const knexInst = knex( 
  {
    client: 'pg',
    connection: process.env.DB_URL
  }
)

const list = 'shopping_list';

function searchByName(searchTerm=process.argv[2]){
  
  knexInst.select('*')
  .from(list)
  .where('name', 'ILIKE', `%${searchTerm}%`)
  .then(res=> {
    console.log(res);
  })
}

searchByName();

// function pagination(page=process.argv[2]){
//   const itemsPerPage= 6
//   const offset = itemsPerPage * (page-1);

//   knexInst.select('*')
//   .from(list)
//   .offset(offset)
//   .limit(itemsPerPage)
//   .then(res=> {
//     console.log(res);
//   });
// }

// pagination();

function addedDaysAgo(daysAgo=process.argv[2]){

  knexInst.select('*')
  .where('date_added', '>', daysAgo)
  .then(res=> {
    console.log(res);
  });
}


addedDaysAgo();