// Heroku has default value of the NODE_ENV = 'production'
var env = process.env.NODE_ENV || 'development';
// Also  in package.json file  "scripts" section  -> "test" script:
// "test" : "export NODE_ENV=test || SET \"NODE_ENV=test\"  && mocha server/**/*.test.js"
// What it does: Set NODE_ENV in Linix/OSX  OR in Windows .  Then  run mocha.
//  Both development and Unit test (test) environments are on local mashine.
console.log("env *****", env);
// refactor configs into to JSON file, which is NOT included into git repository
//
 if(env === 'development' || env === 'test') {
      var config = require('./config.json')
      console.log(config);
      var envConfig = config[env]; // use "square brackets" notation to get objeect's property
      Object.keys(envConfig).forEach((key) => { // callback function
        process.env[key] = envConfig[key];
      });
 }
///
 /////// 1.  Now include  config.json file into .gitignore  file to keep sesitive info out of
 /// public repository on GitHub.com
///  And include random  JWT_SECRET  into the environments of config.json
////  Propagate the new variable into seed.js, user.js  files ( process.env.JWT_SECRET)
///
/////// 2. Now set up Heroku environment variables
///// 1. λ heroku config
// === secret-shelf-43614 Config Vars
// MONGODB_URI: mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001
// Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
/////
/////  2. Set new variable NAME
// λ heroku config:set NAME=Vlad
// Setting NAME and restarting secret-shelf-43614... done, v8
// NAME: Vlad
// Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
// λ heroku config
// === secret-shelf-43614 Config Vars
// MONGODB_URI: mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001
// NAME:        Vlad
// Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
////
//// 3. heroku config:get , heroku config:unset
// λ heroku config:get NAME
// Vlad
// Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
// λ heroku config:unset NAME
// Unsetting NAME and restarting secret-shelf-43614... done, v9
// Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
// λ
/////
////// 4. Set JWT_SECRET variable in the heroku.
/////
// λ heroku config:set JWT_SECRET=UJIWEIHFHFUWHUHGW29384975847567021938nfsjfsjkfnskngfks
// Setting JWT_SECRET and restarting secret-shelf-43614... done, v11
// JWT_SECRET: UJIWEIHFHFUWHUHGW29384975847567021938nfsjfsjkfnskngfks
// Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
// λ heroku config:get JWT_SECRET
// UJIWEIHFHFUWHUHGW29384975847567021938nfsjfsjkfnskngfks
// Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
//


// if( env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI =  'mongodb://192.168.99.100:32768/TodoApp'  // local docker container
// } else if( env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI =  'mongodb://192.168.99.100:32768/TodoAppTest'  // local docker container
// }
