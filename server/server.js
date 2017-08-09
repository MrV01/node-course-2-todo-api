
//
// Task:  Refactoring server.js file.
// Models and configurations supposed to be relocated to separate files.
// Express route handlers supposed to be here, in serve.js
//

var express = require('express');
var bodyParser = require('body-parser');


//
//  New server/db  directory of
//            mongoose.js
//  New server/models directory with models. One model per file:
//         server/models/todo.js
//         server/models/user.js
//
const {ObjectID} = require('mongodb') ;   // for validation of the _id import mongoDB driver. Method:

// Load Mongoose.  Attention!!!  var instead of const. We'll need to test it eventually
var {mongoose} = require('./db/mongoose');   // ES6 feature of de-structuring
// wierd fact: Mongoose minify and lowercases collection name: Todo -> todo in mongodb, so on

//
// Create Model for everything we would like to store.
//  Mongoose  Model has tons of specifications/configurations
//
var{Todo} = require('./models/todo');
var{User} = require('./models/user');

//  Service endpoints POST/todos
//  server.js  should contain  only Express ( or other HTTP)  routes.

var app = express();
// For deployment on Heroku. Adjust port number.
const port = process.env.PORT || 3000;

//
// CRUD operations routes
//
app.use(bodyParser.json());

// POST    /todos route
app.post('/todos', (req,res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,  // added by me to see what will happens: It works
    completedAt: req.body.completedAt  // added by me to see what will happen: It works

    // database successfully updated in all cases.
    // Unless there are validator's exceptions :-)
    // GIT the version, goto sleep.
  });
  // Save to the collection of MongoDB
  todo.save().then((doc) => { // successfully
      res.send(doc);  // send HTTP  responce back
  },  (e) => {   // failure
      res.status(400).send(e);  // cheatshit of code selections:   https://httpstatuses.com/
  });
});// POST /todos

// GET /todos  - route
app.get('/todos',      (req,res) => {
  Todo.find().then((todos)  => {
      return res.send({todos});   // send back ES6  shortcut of { "todos" : todos}  Object contains "todos" array of todos
  }, (e) => {
      return res.status(400).send(e);   // send  back 400 (not found) error
  });
}); // GET /todos

      // Run program.
      // λ node server\server.js
      // Started on Port 3000
      // Mongoose default connection open to mongodb://192.168.99.100:32768/TodoApp
     //
     // Send ( from Postman ) request:   GET localhost:3000/todos
     //               Responce:
     //                             { "todos": [] }

//
///  New paragraph: How to fetch individual ID.
// GET /todos/59848628ba4e4e0e3c5c4f5b     -  route to fetch individual _Id  59848628ba4e4e0e3c5c4f5b
//   part of the  URL is dynamic
app.get('/todos/:id', (req, res) => {
   var id = req.params.id;   // got the id variable from GET HTTP request.
  //  res.send(req.params);    // DEBUG: variable id should be initialized by dynamic id  in req.params object.
  // Valid id using isValid
  if( !ObjectID.isValid(id)) {
       // console.log(`ObjectID.isValid?  Id ${id} not valid`);
       return res.status(404).send({});// Status 404 , and  send back empty set
  };
  // console.log(`ObjectID.isValid?  Id ${id} is valid`);
    // 404 - send back empty set

    Todo.findById(id).then((todo) => {
      if(!todo) {
            // console.log(`Error: ID ${id} todo is not found`);
          return res.status(404).send();// Status 404 , and  send back empty set
      }
        // console.log('Todo findById ', todo);
        res.send({todo});   // send back ES6  shortcut of { "todo" : todo}    }).catch((e) => {
        return res.status(400).send();
    });

  // findById
    // success
        // if todo - send it back
        // if no todo - send back  404 with an empty body
    // error
        // 400 - and send empty body back
});

// Run from cmd.exe    -     nodemon server/server.js
// And run Postman  to generate GET requests.
//  Grab Id from the RoboMongo TodoApp  db,  collection: todos and paste it to the Postman.
//


app.listen(port, () => {
  console.log(`Started up at Port ${port}`);
});

module.exports = {app};  // For testing purposes
