
var env = process.env.NODE_ENV || 'development';
// Also  in package.json file  "scripts" section  -> "test" script:
// "test" : "export NODE_ENV=test || SET \"NODE_ENV=test\"  && mocha server/**/*.test.js"
// What it does: Set NODE_ENV in Linix/OSX  OR in Windows .  Then  run mocha.
//  Both development and Unit test (test) environments are on local mashine.
console.log("env *****", env);
if( env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI =  'mongodb://192.168.99.100:32768/TodoApp'  // local docker container
} else if( env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI =  'mongodb://192.168.99.100:32768/TodoAppTest'  // local docker container
}
