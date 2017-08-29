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
      // console.log(config);
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
// λ heroku config:get MONGODB_URI
// mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001
// Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
// λ
///// 5.  Deploy to Heroku:
////   git push heroku master
// λ git push heroku master
// Counting objects: 91, done.
// Delta compression using up to 4 threads.
// Compressing objects: 100% (83/83), done.
// Writing objects: 100% (91/91), 25.79 KiB | 0 bytes/s, done.
// Total 91 (delta 39), reused 0 (delta 0)
// remote: Compressing source files... done.
// remote: Building source:
// remote:
// remote: -----> Node.js app detected
// remote:
// remote: -----> Creating runtime environment
// remote:
// remote:        NPM_CONFIG_LOGLEVEL=error
// remote:        NPM_CONFIG_PRODUCTION=true
// remote:        NODE_VERBOSE=false
// remote:        NODE_ENV=production
// remote:        NODE_MODULES_CACHE=true
// remote:
// remote: -----> Installing binaries
// remote:        engines.node (package.json):  8.1.3
// remote:        engines.npm (package.json):   unspecified (use default)
// remote:
// remote:        Resolving node version 8.1.3...
// remote:        Downloading and installing node 8.1.3...
// remote:        Detected package-lock.json: defaulting npm to version 5.x.x
// remote:        Bootstrapping npm 5.x.x (replacing 5.0.3)...
// remote:        npm 5.3.0 installed
// remote:
// remote: -----> Restoring cache
// remote:        Loading 2 from cacheDirectories (default):
// remote:        - node_modules
// remote:        - bower_components (not cached - skipping)
// remote:
// remote: -----> Building dependencies
// remote:        Installing node modules (package.json + package-lock)
// remote:        added 16 packages in 3.099s
// remote:
// remote: -----> Caching build
// remote:        Clearing previous node cache
// remote:        Saving 2 cacheDirectories (default):
// remote:        - node_modules
// remote:        - bower_components (nothing to cache)
// remote:
// remote: -----> Build succeeded!
// remote: -----> Discovering process types
// remote:        Procfile declares types     -> (none)
// remote:        Default types for buildpack -> web
// remote:
// remote: -----> Compressing...
// remote:        Done: 20.4M
// remote: -----> Launching...
// remote:        Released v12
// remote:        https://secret-shelf-43614.herokuapp.com/ deployed to Heroku
// remote:
// remote: Verifying deploy... done.
// To https://git.heroku.com/secret-shelf-43614.git
//    524dc5e..6fadca3  master -> master
// Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// if( env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI =  'mongodb://192.168.99.100:32768/TodoApp'  // local docker container
// } else if( env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI =  'mongodb://192.168.99.100:32768/TodoAppTest'  // local docker container
// }
