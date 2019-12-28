var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ayushgupta2498:ayu2498@ds161724.mlab.com:61724/todoapi2498');
//mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};
