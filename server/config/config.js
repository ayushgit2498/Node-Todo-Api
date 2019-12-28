var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}

//we are storing environment variables in config.json which is included in this file and this file will set the environment variable which can be accessed from anywhere
//in package.json we are storing NODE_ENV=test when npm test is run then NODE_ENV is set to test and global env is also set to test else when we actually run our server
//it will be set to deployment
//last;y require config.js file in server.js


//
// blazehunter@blazehunter:~/College/Nodejs/Projects/6.)node-Todo-Api/server$ heroku config
// === stormy-dusk-25297 Config Vars
//
// blazehunter@blazehunter:~/College/Nodejs/Projects/6.)node-Todo-Api/server$ heroku config:set NAME=ayush
// Setting NAME and restarting ⬢ stormy-dusk-25297... done, v8
// NAME: ayush
// blazehunter@blazehunter:~/College/Nodejs/Projects/6.)node-Todo-Api/server$ heroku config
// === stormy-dusk-25297 Config Vars
// NAME: ayush
// blazehunter@blazehunter:~/College/Nodejs/Projects/6.)node-Todo-Api/server$ heroku config:get NAME
// ayush
// blazehunter@blazehunter:~/College/Nodejs/Projects/6.)node-Todo-Api/server$ heroku config:unset NAME
// Unsetting NAME and restarting ⬢ stormy-dusk-25297... done, v9
// blazehunter@blazehunter:~/College/Nodejs/Projects/6.)node-Todo-Api/server$ heroku config
// === stormy-dusk-25297 Config Vars
//
// blazehunter@blazehunter:~/College/Nodejs/Projects/6.)node-Todo-Api/server$


//So in heroku environment we will set JWT_SECRET to whatever string we are using in local environment variable
//so once JWT_SECRET is set in heroku we can access the JWT_SECRET key as process.env.JWT_SECRET
//we do this so that heroku can place the JWT_SECRET key in process.env.JWT_SECRET
