require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
var {ObjectId} = require('mongodb');
const _ = require('lodash');

//Multer adds a body object and a file or files object to the request object.
//The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.

const storage = multer.diskStorage({    //cb is callback
  destination:function(req,file,cb){
    cb(null,'./public');
  },
  filename:function(req,file,cb){
    cb(null,file.originalname);
  }
});

// const fileFilter = (req,file,cb) =>{
//   if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png'){
//     cb(null,true);
//   }
//   else {
//     cb(null,false);
//   }
// }

const upload = multer({storage:storage});
//**************************************************************************************************************************************************************
var {mongoose} = require('./db/mongoose.js'); //here the mongoose variable of mongoose.js is set to mongoose of server.js
var {Todo} = require('./models/todos');     //Always remember the name which you write in brackets {} should be
var {User} = require('./models/users');     //the same as in module.exports
var {authenticate} = require('./middleware/authenticate');
//**************************************************************************************************************************************************************
var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());             //middleware ,executed before going to function handling todos
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public',express.static('public'));    // this will ignore /public
//**************************************************************************************************************************************************************

app.post('/todos',authenticate,upload.single('todoimage'),(req,res) =>{
  console.log(req.file);
  //console.log(req.body);
  var p=" ";
  if(req.file !== undefined)
    p=req.file.path;
  var todo = new Todo({
    text:req.body.text,
    creator:req.user._id,
    todoimage:p
  });

  todo.save().then((doc)=>{
    console.log(doc);
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  });
});



app.get('/todos',authenticate,(req,res)=>{
  Todo.find({creator:req.user._id}).then((todos)=>{
    // res.send({todos});       //{todos} todos will become the json property which will contain array of jsons
    res.send(todos);

  },(e)=>{
    console.log(e);
  });
});
app.get('/todos/:id',authenticate,(req,res)=>{
  var id = req.params.id;

  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }
  Todo.findOne({_id:id,creator:req.user._id}).then((doc)=>{
    if(!doc){
      return res.status(404).send();
    }
    res.send(doc);
  }).catch((e)=>{
    res.status(404).send();
  });
});
app.delete('/todos/:id', authenticate,(req, res) => {
  var id = req.params.id;



  Todo.findOneAndRemove({_id:id,creator:req.user._id}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);



  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();             //note:whenever an object is already created you can change value of existing properties and also add
  } else {                                               //new properties
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({_id:id,creator:req.user._id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});
//**********************************************************************************************************************************************************************
app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);
    var user = new User({
      email:body.email,
      password:body.password
    });
    user.save().then(()=>{
      //console.log('first save');
      return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  })
});




//when this request is called first authenticate will be called which is a middleware
app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
});

app.post('/users/login',(req,res)=>{
  var body = _.pick(req.body,['email','password']);

  User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

app.delete('/users/me/token',authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send({"response":"logged out"});
  },()=>{
    res.status(400).send(e);
  });
});

//**********************************************************************************************************************************************************************

app.listen(port ,() =>{
  console.log(`Server started on port ${port}`);
});

module.exports = {
  app
};
