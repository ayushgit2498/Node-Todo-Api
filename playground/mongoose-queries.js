const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');


var id = '5c4195a20850c168902b87d7';
var userid = '5c42e7bc2452d60cc399b3e7';

Todo.find({
  _id:id
}).then((docs)=>{
  console.log('Todos',docs);
});


// Todo.findOne({
//   _id:id
// }).then((doc)=>{
//   console.log('Todo',doc );
// }).catch((e)=>console.log(e));
var fo;
User.findOne({
  _id:userid
}).then((doc)=>{
  fo = doc;
  console.log('in then' + doc);
}).catch((e)=>console.log(e));
console.log(fo);
