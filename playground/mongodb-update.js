const {MongoClient,ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
  if(err){
      return console.log('Unable to connect');
  }
  console.log('Connected to mongodb server');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: ObjectId("5c417f4476140d0baa29e43c")
  // },{
  //   $set:{
  //     completed:false
  //   }},
  //   {
  //     returnOriginal:false
  //   }
  // ).then((result) =>{
  //   console.log(result);
  // });

  db.collection('Users').updateMany({"location":"Kharadi"},{$set:{name:"Ayush Gupta"},$inc:{age:2}}).then((result)=>{
    console.log(result);
  });



  // client.close();
});
