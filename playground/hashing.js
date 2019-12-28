const {SHA256} =  require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var data = {
  Id:4
};

// var token = jwt.sign(data,'somesecret');
// console.log(token);
//
// var decoded = jwt.verify(token,'somesecret');
// console.log('decoded',decoded);
//jwt uses sh256 algo

// var message = "I am Ayush Gupta";
// var hash = SHA256(message).toString();
//
// console.log(`Message:${message}`);
// console.log(`Hash:${hash}`);
//
//
// var data = {
//   id:4
// }
// //This is the id which we will send back to user
// //when we send the token back to user he might change the user id or may even change the hash to maipulate data of other user.
// //So for each user we will salt the hash i.e add a secret string(salt) and then pass the token which will be used for request
// //So now user has to compulsorily has to send the same token because id + saltstring is unique for that user
// var token = {
//   data,
//   hash:SHA256(JSON.stringify(data) +'secretsalt').toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString();
// //so this is where salt plays its part
//
// var resultcheck = SHA256(JSON.stringify(token.data) +'secretsalt').toString();
//
// if(resultcheck === token.hash){
//   console.log('Data was not changed');
// }
// else{
//   console.log('Data was changed.Do not trust');
// }
//
//
// //once an object is created i can change its prooperty from anywhere in program(script)

var pass = 'hi123';

// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(pass,salt,(err,hash)=>{
//     console.log(hash);
//   });
// });


var hashedpass = '$2a$10$OO1TF8yLSqGWtIYT6tFfUe96B5nvxZspyhQY.LfAEG8qJo/OyoSym';

bcrypt.compare(pass,hashedpass,(err,res)=>{
  console.log(res);
});
