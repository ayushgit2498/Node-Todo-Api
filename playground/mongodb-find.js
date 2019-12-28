const {MongoClient,ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
  if(err){
      return console.log('Unable to connect');
  }
  console.log('Connected to mongodb server');
  const db = client.db('TodoApp')


  // db.collection('Todos').find({"completed":true}).toArray().then((docs) =>{
  //   console.log(`Todos`);
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) =>{
  //   console.log('Unable to fetch todos',err);
  // });
  db.collection('Todos').find({"completed":true}).count().then((count) =>{
    console.log(`Todos count:${count}`);
  },(err) =>{
    console.log('Unable to fetch todos',err);
  });
  db.collection('Users').find({"name":"Ayush Gupta"}).toArray().then((docs) =>{
    console.log(JSON.stringify(docs,undefined,2));
  },(err) =>{
    console.log('Unable to fetch todos',err);
  });


  // client.close();
});
