
//// Run from cmd.exe    -     nodemon server/server.js
////  Run from cmd.exe WITH  --trace-warnings for Promise(s) troubleshooting
////  I.E. λ nodemon --trace-warnings server\server.js
/// Debugging Node app (https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)
///  1. node --inspect-brk  --trace-warnings   server\server.js
///     OR nodemon --inspect-brk  --trace-warnings   server\server.js
///  2. Open about:inspect in Chrome
///  3. Click on "Open dedicated DevTools for Node"
///  4. Happy Debugging!
//
// Then run Postman  to generate GET / POST/ DELETE /PATCH requests.
//  Grab Id from the RoboMongo TodoApp  db,  collection: todos and paste it to the Postman.
// Push to Heroku command:  git push heroku master
// Task:  Refactoring server.js file.
// Models and configurations supposed to be relocated to separate files:
//  Folders: ./db  ,  ./models , ./config
// Express route handlers supposed to be here, in server.js
//
// Import configuration file of the app.
require('./config/config') ;  // config.js deals with global variables

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
//
//  New server/db  directory of
//            mongoose.js
//  New server/models directory with models. One model per file:
//         server/models/todo.js
//         server/models/user.js
//
const {ObjectID} = require('mongodb') ;   // Native MongoDB driver,
                                                        //for validation of the _id import mongoDB driver. Method:

// Load Mongoose.  Attention!!!  var instead of const. We'll need to unit test it with Mocha
var {mongoose} = require('./db/mongoose');   // ES6 feature of de-structuring
// wierd fact: Mongoose minify and lowercases collection name: Todo -> todo in mongodb, so on

//
// Create Model for everything we would like to store.
//  Mongoose  Model has tons of specifications/configurations
//
var{Todo} = require('./models/todo');
var{User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

//  Service endpoints POST/todos
//  server.js  should contain  only Express ( or other HTTP)  routes.

var app = express();    ///  provides methods :  post(POST HTTP), get(GET HTTP), delete ( DELETE HTTP )

// For deployment on Heroku.
// Adjust port number according to process.env.PORT global. - Done on top of the page.
const port = process.env.PORT ;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////                              CRUD operations routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.json());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////   POST    /todos route    | Part 1  to adapt "authenticate" middleware
///    to fill-out   "_creator :  ObjectId of user, who posted it in"
///    property in the new "todo" documents
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/todos', authenticate,  (req,res) => {
  //  "authenticate"   adds "user" , "token" property-Objects to   req  parameter
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
    completed: req.body.completed,  // added by me to see what will happens: It works
    completedAt: req.body.completedAt  // added by me to see what will happen: It works

  });
  // Save to the collection of MongoDB
  todo.save().then((doc) => { // successfully
      res.send(doc);  // send HTTP  responce back
  },  (e) => {   // failure
      res.status(400).send(e);  // cheatshit of code selections:   https://httpstatuses.com/
  });
});// POST /todos

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///   GET /todos  - route    | Part 1.  route to implement "authenticate" middleware
///    Show only todos, that belongs to the authenticated user.
////   The middleware sets up    req.user  ,  req.token properties on the req Object-request
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/todos',   authenticate,    (req,res) => {
  Todo.find({   // search for  Todos  that were created by the authenticated user.
    _creator: req.user._id
  }).then((todos)  => {
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///   Fetch individual ID.   |  Part2  Adaptation to  authenticate
///   GET /todos/59848628ba4e4e0e3c5c4f5b     -  route to fetch individual _Id  59848628ba4e4e0e3c5c4f5b
///   part of the  URL is dynamic
/// My guess regarding   authentication:
///  additional compare _creator: _id of the todo  and  the  token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/todos/:id', authenticate, (req, res) => {
   var id = req.params.id;   // got the id variable from GET HTTP request. (/todos/:id)
  // Valid id using isValid
  if( !ObjectID.isValid(id)) {
       return res.status(404).send({});// Status 404 , and  send back empty set
  };
   // authentication: findById(id) in the collection  replaced by findOne( ... _id , _creator )
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
      if(!todo) {
        // 404 - send back empty set
          return res.status(404).send();// Status 404 , and  send back empty set
      }
      // success  ---  if todo - send it back
        res.status(200).send({todo})
      }).catch((e) => {        // error
        // 400 - and send empty body back
        return res.status(400).send();
      });

});

///////////////////////////////////////////////////////////////////////////////////////
// Challeng from Lecture 82  section  7
//  Delete todo by _id  from MongoDB
//  Adding  authenticate
/////////////////////////////////////////////////////////////////////////////////////////
app.delete('/todos/:id', authenticate,  ( req, res ) => {
      // get the id
      var id = req.params.id;   // got the id variable from GET HTTP request.
      // validate the id -> not valid ? return 404
      if( !ObjectID.isValid(id)) {
           return res.status(404).send({});// Status 404 , and  send back empty set
      };
      // remove todo by id
      // for authenticate:  findByIdAndRemove  replaced by findOneAndRemove (mongoose methods)
      Todo.findOneAndRemove({
        _id : id,
        _creator : req.user._id
      }).then((todo) => {
           // success
            if(!todo) {
                 // if no doc, send 404
                return res.status(404).send({});// Status 404 , and  send back empty set
            }
            // if doc, send doc back with 200
            res.status(200).send({todo});
        }).catch((e) => {       // error
             // 400 with empty body
            res.status(400).send();
       });
});

///////////////////////////////////////////////////////////////////////////////////////////
///  PATCH /todos/:id   aka  UPDATE totdo
///  Adapted to authentication
/// 1. Add 'authenticate' middleware (server.js)
/// 2. Update route  PATCH /todos/:id  (server.js) with
///    changes in mongoose query,  regarding mongoose find  method:
///     findOneAndUpdate
///              _id : id,
///               _creator : req.user._id
///  3.  Update tests-case ( server.test.js )
///     .set('x-auth', users[1].tokens[0].token) //  SET x-auth header from "seed" user
///////////////////////////////////////////////////////////////////////////////////////////
//  PATCH  /todos/:id   request.
app.patch('/todos/:id', authenticate, ( req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);   // Lowdash library function.
  // Picks up "text" and "completed" properties from JSON object.

      if( !ObjectID.isValid(id)) {
           return res.status(404).send({});// Status 404 , and  send back empty set
      };

      if(_.isBoolean(body.completed) && body.completed) {
          body.completedAt  = new Date().getTime();  //
      } else {
          body.completed = false;  //
          body.completedAt = null ; //
      }
      // authentication: findByIdAndUpdate() replaced by  findOneAndUpdate()
      Todo.findOneAndUpdate( {
        _id: id,
        _creator : req.user._id  // thanks to authenticate() middleware
      },  {$set: body}, {new: true}).then((todo) => {
        // Check if the todo object exist.
        if(!todo) {
          return res.status(404).send();
        }
        res.send({todo});
      }).catch((e) => {
         res.status(400).send();
      });

});   // End of Update   PATCH request.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Users  Section
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge: Section 8 , Lecture 88.
// Create new User   POST /users
// Combine   POST    /todos route code.
// And   var body = _.pick(req.body, ['email','password']);  from PATCH route.
//
//  Continue to modify  POST /users  sign up call. Generating tokens.
//  Generate token and return it  from the sign-up REST end point.
//  By the way, PassportJS can be used to handle JWT tokens generation.
//  However it requires an effort to adapt the code.
//
app.post('/users', ( req, res ) => {
      // Select email, password from the  request
      var body = _.pick(req.body, ['email','password']);
      // create new User object  from JSON object
      // which consists of  { email: email , password: password } thanks to _.pick()
      var user = new User( body);
      //  New custom methods we define:
     //  1. User.findByToken()   // Model method addition to mongoose "User" model
     //       returns user by token.
     //  2. user.generateAuthToken() // instance level  method.
     //
     // Save to the collection of MongoDB
      user.save().then(() => { // successfully saved user to MongoDB
         return user.generateAuthToken();
      }).then((token) => {  // got token from the previos .then(resolve,) which === user.generateAuthToken()
        res.header('x-auth', token).send(user);   //  Added extra header 'x-auth' : token  , and send user back
      }).catch((e) => {   // failure  to save user or generate token, etc.
          res.status(400).send(e);  // cheatsheet of code selections:   https://httpstatuses.com/
      });
});  // End of Create new User  REST API. http  POST request


// Section 8. Lection 91.  Private Express routs.
// Demo  private route:  GET /users/me

// Refactoring authentication code from /users/me into separate function:
// server/middleware/authenticate.js


app.get('/users/me' , authenticate, (req, res) => {
  res.send(req.user);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Challenge:  Dedicated route for a loging  in users
// POST /users/login {email, password }
// The route gets email, password in clear text.
// It compares hash from db bcrypt.compare  with email and password,
// and sends back 1. header x-auth  with new auth token  inside.
//                          2.  body  with _id of the "user" document inside.
/// Example of request:
//  /POST /users/login   {
// 	"email": "vlad12@example.com",
// 	"password": "password"
// }
//  Response header:
//    x-auth →eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTlkZTgzYTMxYmIyMjIzOTg3MmI1NzIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTAzNTk4NTU4fQ.ZHiiG4tlLSQECFi21i06gObv-YiHvYiz6llc76hL8qU
//  Response body:
//  {
//    "_id": "599de83a31bb22239872b572"
//  }
//  Check it out : GET /users/me
//  with x-auth header equals to /POST /users/login
//  returns:
//  {
//    "_id": "599de83a31bb22239872b572",
//    "email": "vlad12@example.com"
//  }
///   Perfect !!!!
///////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/users/login',(req, res) => {
   // Select email, password from the  request
    var body = _.pick(req.body, ['email','password']);

    User.findByEmail(body).then( (user) => {
          //  Successful comparison e-mail and password by findByEmail
          // Now  generate new x-auth token ( .methods. user.generateAuthToken()  will push it to the DB document array )
          return  user.generateAuthToken().then((token) => {
            res.status(200).header('x-auth', token).send(user);
          });
    }).catch((e) => {
          res.status(400).send(e); // user not found
    });
}); // End of  POST /user/login

/////////////////////////////////////////////////////////////////////////////////////
/// Logout
/////////////////////////////////////////////////////////////////////////////////////
//  Middleware (req , res, next ) custom function   authenticate ("authenticate.js" )
///                                                saves successfully
//  authenticated credentials into the "request" Object.
//      req.user = user;
//      req.token = token;
////
app.delete('/users/me/token', authenticate , (req,res) => {
  req.user.removeToken(req.token).then( () => {
     res.status(200).send();   // "resolve" callback to Promise.then()
  }, () => {
      res.status(400).send();  // "reject" callback to Promise.then()
  });
});


///////////////////////////////////////////////////////////////////////////////////
// Start the app on the port.
///////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Started up at Port ${port}`);
});

module.exports = {app};  // For Unit testing purposes ( server.test.js imports the file)
