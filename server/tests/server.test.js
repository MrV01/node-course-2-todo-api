// Command line run command:  λ npm run test-watch
//
//
const expect = require('expect');
const request = require('supertest');
// Mocha and nodemon  are not to be "require"
const {ObjectID} = require('mongodb') ;   // for validation of the _id import mongoDB driver.

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} =  require('./../models/user');

const {todos, populateTodos,users,populateUsers} = require('./seed/seed'); // import seed data to DB

// Clearing users collection before each test case run.
beforeEach(populateUsers);
// Cleaning Todo collection before each test case run. Mocha runs beforeEach()
beforeEach(populateTodos);

// test case 1 . Insert new todo in the MongoDB
// accomodate to "seeding" data = 2 documents.
describe('Post /todos', () => {
  it('should create a new todo', (done) => {
    var text = `Test (super) todo text random number: ${ Math.floor((Math.random() * 10) + 1) }`;
    request(app)  // "supertest"  of app from server.js file
      .post('/todos')  // set POST request
      .send({text})   // send Object  (in ES6 syntax)
      .expect(200)  // 200  HTTP OK code.
      .expect((res) => {    // Custom expect assertion
          expect(res.body.text).toBe(text );    // body must match to the text
      })
      .end((err,res) => {  // instead of done check  for errors , and check MongoDB collection
        if (err) {  // got error, return the errors
          return done(err);   // test fails
        }
        // No errors,  Then search for a document  in collection Todo of MongoDB
        // Verify if the document in the database matches to one  sent in POST request.
        Todo.find().then((todos) => {
          expect (todos.length).toBe(1 + 2); // one record was inserted into "todo" collection + 2 seedings
          expect(todos[2].text).toBe(text);  // and text field  in third document matches the one we have sent through the request above
          done();  /// done successfully
        }).catch((e) => done(e));   // Statement syntax as oppose function syntax . Catch and return errors if any
      });
    });

  it('should NOT create todo with invalid body data, mongoose models validators should catch it', (done) => {
    // accomodated to "seeding" data
      var text ={};   // Invalid  body - empty object. supposed to be string

      request(app)  // "supertest"  of app from server.js file
        .post('/todos')  // set POST request
        .send(text)   // send Object  (in ES6 syntax)
        .expect(400)  // 400  HTTP Error  code.
        .end((err,res) => {  // instead of done check  for errors , and check MongoDB collection
          if (err) {  // got error, return the errors
            return done(err);   // test fails
          }
          // No errors,  Then search for a document  in collection Todo of MongoDB
          // Verify if the document in the database matches to one  sent in POST request.
          Todo.find().then((todos) => {
            expect (todos.length).toBe(2); // zero record was inserted into "todo" collection, only "seeding" documents
            done();  /// done successfully
          }).catch((e) => done(e));   // Statement syntax as oppose function syntax . Catch and return err
        });
    });
});  // End of POST /todo

//  Test case

describe("GET /todos", () => {
  it('should get all todos', (done) => {
    request(app)  // call "supertest"
      .get('/todos') // express HTTP GET
      .expect(200) // expect HTTP 200
      .expect((res) => { // expect response body contain seeding documents in  res,body
              expect(res.body.todos.length).toBe(2);
      })
      .end(done); // successfully completed tedt case

  } );

});   //  End of  GET /todos

//  Test case

describe("GET /todos/:id", () => {
  it("should return todo document by _id", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString() }`)
      .expect(200)
      .expect((res) => {
         expect( res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
    // two more test cases On your Own.
  it("should return status 404 if todo not found", (done) => {
    // Create new ObjectID instance, and find it.
       var testId = new ObjectID().toHexString();
      // Expect 404 code back
       request(app)
        .get(`/todos/${testId}`)
        .expect(404)
        .end(done);
  });

    it("should return status 404 for non-object ids", (done) => {
      // /todos/123
        var testId = "12345abc";
        request(app)
         .get(`/todos/${testId}`)
         .expect(404)
         .end(done);
    });

});  // end of GET /todos/:id   describe

//  Test case

describe('DELETE /todos/:id', () => {

    it('should remove  a todo', (done) => {
        // Delete one of the pre-defined todos in the database,
        var hexId  = todos[1]._id.toHexString();
        // Call request
        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect(( res) => {
            expect(res.body.todo._id).toBe(hexId);
          })
         .end((err, res) => {
              if(err) {
                return done(err);
              }

              // query database using findById() assertion: toNotExist
              //  hint:  expect( query ).toNotExist();

              Todo.findById(hexId).then((todos) => {
                expect (todos).toNotExist();
                done();  // done successfully, the document removed from database
              }).catch((e) => done(e));   // Statement syntax as oppose function syntax . Catch and return errors if any

         });

    });

     it('should return 404 if todo not found', (done) => {
       // Create new ObjectID instance, and find it.
          var testId = new ObjectID().toHexString();
         // Expect 404 code back
          request(app)
           .delete(`/todos/${testId}`)
           .expect(404)
           .end(done);
     });
    //
    it('should return 404 if  object id is not valid', (done) => {
      var testId = "12345abcdef";  // Is not MongoDB ID at all
      request(app)
       .delete(`/todos/${testId}`)
       .expect(404)
       .end(done);
    });
    //

}); // end of describe DELETE /todos/:id

describe( 'PATCH /todos/:id', () => {

  it('should update the todo', (done) => {
     // grab id of the first item
     var hexId  = todos[0]._id.toHexString();
     // update text, set completed true
      var modText = todos[0].text +  " PATCH1";
      var modCompleted = true;
     // Call request
     request(app)
       .patch(`/todos/${hexId}`)
       .send( { "text" : modText , "completed" : modCompleted } )
       // 200
       .expect(200)
       // text is changed, completed is true, completedAt is a number  .toBeA
       .expect(( res) => {
           // console.log(res);
          expect(res.body.todo._id).toBe(hexId);
          expect(res.body.todo.text).toBe(modText);
          expect(res.body.todo.completed).toBe(modCompleted);
          expect(res.body.todo.completedAt).toBeA('number'); //  type of  constructor  equals
        })
      .end((err, res) => {
           if(err) {
             return done(err);
           }
           done();
      });  // end of request app
  }); // end of it

  it('should clear completedAt when todo is not completed ', (done) => {
    // grab id of the second todo  item
    var hexId  = todos[1]._id.toHexString();
    // update text, set completed false
    var modText = todos[1].text + " PATCH2";
    var modCompleted = false;
    // 200
    // Call request
    request(app)
      .patch(`/todos/${hexId}`)
      .send( { "text" : modText , "completed" :   modCompleted } )
      .expect(200)
      .expect(( res) => {
        // text is changed, completed is false, completedAt is null  .toNotExist
        expect(res.body.todo._id).toBe(hexId);
        expect(res.body.todo.text).toBe(modText);
        expect(res.body.todo.completed).toBe(modCompleted);
        expect(res.body.todo.completedAt).toNotExist(); //   completedAt === null
      })
     .end((err, res) => {
          if(err) {
            return done(err); //error
          }
          done();  //OK
    }); // end of request app

  });  // end of it

});  // end of  describe  PATCH /todos/:id

// Authentication test route:
describe('GET /user/me', () => {
  it('should return user if authenticated', (done) => {
      // if provided valid token, get the valid data back
      request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token) // token from the  first element of the array seedings
        .expect(200)
        .expect((res) => {
            // Two assertions . Compare  arrays element  in memory  with returns from REST API
            expect(res.body._id).toBe(users[0]._id.toHexString()); // _id matches
            expect(res.body.email).toBe(users[0].email); // email matches
        }).end(done);
  });

  it('should return user if not authenticated', (done) => {
    // Make a call, without "x-auth" token
    request(app)
      .get('/users/me')
      // Assertion 1:  401 back when .set('x-auth') is missing
      .expect(401)
      .expect((res) => {
        // Assertion 2: empty body object  (use .toEqual()  instad of .toBe() )
          expect(res.body).toEqual({}); // empty body,  res.body === {}
      }).end(done);
  });

}); // describe 'GET /user/me' ended


//  Test sign-up route.
describe('POST /users', () => {
  // when valid non-duplicated email and password provided,
  // new user should be created
  it('should create a user', (done) => {
     var email = 'example123@example.com';
     var password = 'validPassword123!';
     request(app)
      .post('/users')
      .send({email,password})
      .expect((res) => {
          expect(res.headers['x-auth']).toExist();
          expect(res.body._id).toExist();  // some new unique _id generated by MongoDB
          expect(res.body.email).toBe(email);
      })
      .end((err) => {
         if(err) {
           return done(err);
         }
         User.findOne({email}).then((user) => {
           expect(user).toExist();
           expect(user.password).toNotBe(password);  // Because it has been hashed
           done();
         });
      });
  });

 // if password is shorter than 6 characters, or email is invalid
  it('should return validation errors if request is invalid ', (done) => {
    // return 400
    var email = 'vlad1234455@example.com';
    var password = 'user'; // password is too short
    request(app)
     .post('/users')
     .send({email,password})
     .expect(400)
     .end((err) => {
        if(err) {
          return done(err);
        }
        User.findOne({email}).then((user) => {
          expect(user).toNotExist();
          done();
        });
     });
  });

  // Check for a duplication email ( is already taken)
  it('sould Not create user if email is in use', (done) => {
    // return 400
    var email = 'vladSeedData01@example.com';
    var password = 'validPassword!';
    request(app)
     .post('/users')
     .send({email,password})
     .expect(400)
     .end((err) => {
        if(err) {
          return done(err);
        }
        User.findOne({email}).then((user) => {
          expect(user).toExist();
          done();
        });
     });
  });

}); //  describe 'POST /users' test ended

//  Test Login route: POST /users/login
 describe('POST /users/login', () => {
// // when valid email and password provided,
// //  Following should be returned:
//// Status: 200,  header  x-auth: token and body: {"email" : "same e-mail"}
////
  it('should authenticate a user', (done) => {
     var email = users[1].email;    // seed user 2 email
     var password = users[1].password;  //seed user 2 password

   request(app)
      .post('/users/login')
      .send( { 'email' : email , 'password' : password })
      .expect(200)
      .expect((res) => {
        // console.log(res);
         expect(res.headers['x-auth']).toExist();
      })
      .end((err,res) => {
         if(err) {
           return done(err);
         }
         // Check "seed" of collection "users" for the document with _id
         User.findById( users[1]._id).then((user) => {  //  Attention!!! _id in MongoDB is an Object!!!
           expect(user.tokens[0]).toInclude({   // Excellent  Checkup of most recent push(token)
                access: 'auth',
                token:  res.headers['x-auth']
           });
           done();
         }).catch((e) => done(e));  // Catch all errors and rejected Promises
      });
  });

////  Next test-case : failure to authenticate NON-existing user.
  it('should NOT authenticate a non-existing user with correct password', (done) => {
   var email = users[0].email + 'm';   // seed user 1; // added  tailing "m" .
   var password = users[0].password;
   request(app)
    .post('/users/login')
    .send({email,password})
    .expect(400)
    .end((err) => {
       if(err) {
         return done(err);
       }
       User.findOne({email}).then((user) => {
         expect(user).toNotExist();
         done();
       }).catch((e) => done(e));
    });
  });

////  Failure to authenticate Existing user with wrong password
  it('should NOT authenticate a Existing user with wrong password', (done) => {
   var email = users[0].email;
   var password = users[0].password + '!!' ;   // Tailing  !! added to the password
   request(app)
    .post('/users/login')
    .send({email,password})
    .expect(400)
    .end((err) => {
       if(err) {
         return done(err);
       }
       User.findOne({email}).then((user) => {
         expect(user).toExist();
         done();
       }).catch((e) => done(e));
    });
  });

}); // End  Test Login route: POST /users/login

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Test Logout   route:   DELETE /users/me/token
 describe('DELETE /users/me/token', () => {

   // remove correct "x-auth" token  from the array of tokens
   //  Using "seed" data from  users[0].tokens[0]
   it('Should remove "auth" token from the userS tokens array', (done) => {
     var userAuthToken = users[0].tokens[0].token; // token from the  first element of the array seedings
     request(app)
       .delete('/users/me/token')
       .set('x-auth', userAuthToken)
       .expect(200)
       .end( (err, res) => {  // asyncronous assertion, because of search in the DB
         if(err) {   // any from the assertions above?
           return done(err);
         }
           // Check that there is no particular token in the Array anymore .
          // User.findByToken(userAuthToken).then( (user) => {
          //       if(! user ) { done() }; // success, because no user doc have the token
          // }).catch((e) => done(e));

          // Instructor's version . It looks better :-(  Because it checks same user's tokens.
          User.findById(users[0]._id).then((user) => {
              expect(user.tokens.length).toBe(0);  // none tokens left in the "seed" user.
              done();
          }).catch((e) => done(e));
       });  // END of async assertion
   });

 }); // Test Logout   route:   DELETE /users/me/token
