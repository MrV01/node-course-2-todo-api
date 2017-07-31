
// Load Mongoose.  Attention!!!  var instead of const
var mongoose = require('mongoose');

// Configuration variables.
const mongodbConnectionStr = 'mongodb://192.168.99.100:32770/TodoApp';

// We  prefer Promises. Originally comes from third party library, therefore we must liet it know
// which implementation of Promise  we would like to use.
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

// Create Model for everything we would like to store.
//  Mongoose  Model has tons of specifications/ configurations
// wierd fact: Mongoose minify and lowercases collection name: Todo -> todo in mongodb
var Todo = mongoose.model('Todo', {  // Very basic cofig here see docs for many other features.
   text: {
     type: String
   },
   completed: {
     type: Boolean
   },
   completedAt: {
     type: Number
   }
});

// Creating new todo DEMO
var newTodo = new Todo( {
  text: 'Cook Dinner, and Breakfast'
});

newTodo.save().then((doc) => {
  console.log("Saved todo", JSON.stringify(doc, undefined, 2));
}, (error) => {
  console.log("Unable to save Todo");
});

        // node server\server.js
        // Saved todo { __v: 0, text: 'Cook Dinner', _id: 597ecba392bfe61954adf199 }

// __v: 0   Is internal Mogoose  version number. Keeps track of models changes over time.

/// Challege : Fill out all three fields.
var newTodo2 = new Todo( {
  text: 'Goto Sleep',
  completed: false,
  completedAt: 1
});

newTodo2.save().then((doc) => {
  console.log("Saved todo 2 ", JSON.stringify(doc, undefined, 2));
}, (error) => {
  console.log("Unable to save Todo 2",error);
});

        // λ node server\server.js
        // Saved todo { __v: 0, text: 'Cook Dinner', _id: 597ece048e837a1c3cee693e }
        // Saved todo 2 { __v: 0,
        //   text: 'Goto Sleep',
        //   completed: false,
        //   completedAt: 1,
        //   _id: 597ece048e837a1c3cee693f }
