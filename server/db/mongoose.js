
// "Mongoose lives in it's own place" :-)

// Load Mongoose.  Attention!!!  var instead of const to allow "supertest" plugin works
var mongoose = require('mongoose');

// Configuration variables. Mongo DB is remote or local?
// Has been set in variable process.env.MONGODB_URI, file server.js
const mongodbConnectionStr =  process.env.MONGODB_URI ;  // local docker container OR Heroku,
// We  prefer Promises. Originally comes from third party library, therefore we must let Mongoose know
// which implementation of Promise  we would like to use. (Embedded global.Promise at this time)

mongoose.Promise = global.Promise;
mongoose.connect(mongodbConnectionStr);

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

// End of   Best practice from http://theholmesoffice.com/mongoose-connection-best-practice


// module.exports = {
//   mongoose: mongoose;  // ES5 syntax
// }

mongoose.exports = { mongoose };  //ES6 syntax
