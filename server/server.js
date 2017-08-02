
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
//
// CRUD operations routes
//
app.use(bodyParser.json());

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

  todo.save().then((doc) => { // successfully
      res.send(doc);
  },  (e) => {   // failure
      res.status(400).send(e);  // cheatshit of code selections:   https://httpstatuses.com/
  });
});


app.listen(3000, () => {
  console.log('Started on Port 3000');
});
