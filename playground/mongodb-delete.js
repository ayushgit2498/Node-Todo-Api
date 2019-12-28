const {MongoClient,ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
  if(err){
      return console.log('Unable to connect');
  }
  console.log('Connected to mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').deleteMany({"text":"Pack Bag"}).then((result) =>{
  //   console.log(result);
  // });

  // db.collection('Todos').deleteOne({"text":"pack bag"}).then((result) =>{
  //   console.log(result);
  // });

  db.collection('Todos').findOneAndDelete({_id:ObjectId("5c417943d5761d60d362dbaf")}).then((result) =>{
    console.log(result);
  });



  // client.close();
});
