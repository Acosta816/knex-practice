require('dotenv').config();
const knex = require('knex');

//creating the knex instance by calling the knex() function and passing necessary args.
const knexInstance = knex( 
  {
  client: 'pg',
  connection: process.env.DB_URL,
  }
);

const amz = 'amazong_products';

console.log('connection successful');

knexInstance.from('amazong_products').select('*')
  .then(res=> {
    console.log(res);
  });

// knexInstance.select('product_id', 'name', 'price', 'category')
//   .from('amazong_products')
//   .where( {
//     name: 'Point of view gun'
//     }
//   )
//   .first()
//   .then(res=> {
//     console.log(res);
//   })

// knexInstance
//   .select('name', 'price', 'category')
//   .from(amz)
//   .where('name', 'ILIKE', `%${process.argv[2]}%`)
//   .then(res=> {
//     console.log(res);
//   })

// function searchByProductName(searchTerm=process.argv[2]){
//   knexInstance
//   .select('name','product_id', 'price', 'category')
//   .from(amz)
//   .where('name', 'ILIKE', `%${searchTerm}%`)
//   .then(res=> {
//     console.log(res);
//   });
// }  

// searchByProductName();

// function paginateProducts(page=process.argv[2]){
//   const itemsPerPage=10;
//   const offset = itemsPerPage * (page-1);

//   knexInstance
//   .select('product_id', 'name', 'price', 'category')
//   .from(amz)
//   .limit(itemsPerPage)
//   .offset(offset)
//   .then(res=> {
//     console.log(res);
//   });
// }

// paginateProducts();

// function getProductsWithImages(){

//   knexInstance
//     .select('product_id', 'name', 'price', 'category', 'image')
//     .from(amz)
//     .whereNotNull('image')
//     .then(res=> {
//       console.log(res);
//     });
// }

// getProductsWithImages();

// function mostPopularVideosForDays(days) {
//   knexInstance
//     .select('video_name', 'region')
//     .count('date_viewed AS views')
//     .where(
//       'date_viewed',
//       '>',
//       knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
//     )
//     .from('whopipe_video_views')
//     .groupBy('video_name', 'region')
//     .orderBy([
//       { column: 'region', order: 'ASC' },
//       { column: 'views', order: 'DESC' },
//     ])
//     .then(result => {
//       console.log(result)
//     })
// }

// mostPopularVideosForDays(30)
