var {User} = require('./../models/users');

//middleware
var authenticate = (req,res,next)=>{
  var token = req.header('x-auth');
  User.findByToken(token).then((user)=>{      //if error occurs in findByToken reject promise will return and 'then' will be rejected and catch will get executed
    if(!user){
    return Promise.reject();              //so rres.send(user) won't be executed and catch will be executed

    }
    req.user = user;            //we are adding user and token to request
    req.token = token;
    next();
  }).catch((e)=>{
    res.status(401).send();
  });
};


module.exports = {authenticate};
