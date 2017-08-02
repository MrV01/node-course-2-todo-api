
 1. Mongoose  is ORM  library.  ( O - object R- relational  M - mapper )

 2. Everything Mongoose does, can be done using  native mongoDB driver API.

 3. Who wants to deal with the native driver boilerplate ( including support :-( ) ?


MongooseJS  :  http://mongoosejs.com/

Docs: http://mongoosejs.com/docs/guide.html

1. Install  Mongoose  in node-todo-api project.
https://www.npmjs.com/package/mongoose
npm install mongoose@4.10.8 --save  -save-exact
At the moment of the testing mongoose@4.11.5 was not stable . See discussion below.
NPM install command DOCS: https://docs.npmjs.com/cli/install

Mongoose Models DOC: http://mongoosejs.com/docs/models.html


  // (node:8088) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client

https://github.com/Automattic/mongoose/issues/5399
  The easiest fix for this; "npm remove mongoose" then "npm install mongoose@4.10.8 --save" problem solved. Upgrading is not always the best option.

Managing mongoose connection:
 http://theholmesoffice.com/mongoose-connection-best-practice/

Following must be included after

mongoose.Promise = global.Promise;
mongoose.connect(mongodbConnectionStr);

To handle various events, othervise Mongoose orphains the connections.  
And MongoDB process is running out of connections limit rather soon.

// Best practice from http://theholmesoffice.com/mongoose-connection-best-practice/
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongodbConnectionStr );
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
//////////////////////////////////////////////////////////////////////////////////////////

2. Install ExpressJS and Body-Parser npm modules.

https://www.npmjs.com/package/express
https://www.npmjs.com/package/body-parser

npm i express@4.15.3 body-parser@1.17.2  --save

3. HTTP status reference:  https://httpstatuses.com/ 
