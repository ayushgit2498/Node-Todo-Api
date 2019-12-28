var mongoose = require('mongoose');


//Todo is the model
var Todo  = mongoose.model('Todo',{
  text:{
    type:String,
    required:true, //text is required
    minlength:1,
    trim: true    //removes whitespaces from start and end
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  },
  creator:{
    type:mongoose.Schema.Types.ObjectId,      //we want to specifically store the _id of the document of that user
    required:true
  },
  todoimage:{
    type:String,
    default:""
    }
});

module.exports = {
  Todo
};
