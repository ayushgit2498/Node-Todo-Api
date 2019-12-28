const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  email:{
    type:String,
    minlength:1,
    trim:true,
    required:true,
    unique:true,
    validate:{
      validator:(value) =>{
        return validator.isEmail(value);
      },
      message:  '{VALUE} is not a valid email'
    }
  },
  password:{
    required:true,
    type:String,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

//methos on instances
userSchema.methods.toJSON = function (){
  var user = this;
  var userObject = user.toObject(); //converts document to regular object
  return _.pick(userObject,['_id','email']);      //this function is called when response is sent
}




userSchema.methods.generateAuthToken = function (){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),access},process.env.JWT_SECRET).toString();

  //user.tokens = user.tokens.concat([{access,token}]);
  user.tokens.push({access, token});
  //console.log('inside generateAuthToken',token);
  return user.save().then(()=>{
      return token ;                      //when generateAuthToken function is called we are creating the token and returning the part after return i.e user.save()
  });                                     //so user.save() is first returned after that user.save() is executed inside server.js after that then promise
};                                        //is called which will return token and then this token is returned by outermost return and after that next then is called
                                          //which will contain promise

userSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull:{         //pull will remove object from array of tokens if token matches.
      tokens:{
        token:token
      }
    }
  });
};

//methods on schemas
userSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token,process.env.JWT_SECRET);
  }catch(e){
    // return new Promise((resolve,reject)=>{
    //   reject();
    // });
    return Promise.reject();  //this is equivalent to above code
  }

  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
};


userSchema.statics.findByCredentials  = function(email,password){
  var User = this;
  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject();
    }

    return new Promise((resolve,reject)=>{
      bcrypt.compare(password,user.password,(err,res)=>{
        if(res){
          console.log(user.password);
          resolve(user);

        }
          else {
            console.log(password);
            reject();
          }
      });
    });
  });
};

userSchema.pre('save',function(next){

  var user = this;
  if(user.isModified('password')){      //isModified checks if password was changed.So this will be called when user signups up first time and when next time
        bcrypt.genSalt(10,(err,salt)=>{         //user is actually changing the password. if we add other info to user document
          bcrypt.hash(user.password,salt,(err,hashpass)=>{        //other than password then password won't get rehashed
            user.password = hashpass;
            next();
          });
        });

  }else{
    next();
  }

});

var User = mongoose.model('User',userSchema);

module.exports = {
  User
};
