//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectId} = require('mongodb');
//This pulls out MongoClient property from mongodb and creates a variable MongoClient


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
  if(err){
      return console.log('Unable to connect');
  }
  console.log('Connected to mongodb server');
  const db = client.db('TodoApp')

  // db.collection('Todos').insertOne({
  //   text:'Something',
  //   completed:true
  // },(err,result) =>{
  //   if(err)
  //   return console.log('Unable to insert');
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // });
  db.collection('Users').insertOne({
    name:'Ayush Gupta',
    age:20,
    location:'Kharadi'
  },(err,result) =>{
    if(err)
      return console.log('Unable to insert');
    console.log(result.ops[0]._id.getTimestamp());
  });

  client.close();
});


// sudo killall -15 mongod
// ./mongod --dbpath ~/College/Nodejs/Projects/
