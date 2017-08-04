//
const expect = require('expect');
const request = require('supertest');
// Mocha and nodemon  are not to be "require"

const{app} = require('./../server');
const {Todo} = require('./../models/todo');

// Seed data for todo collection:

const todos = [
  {  text: "First test todo",      opt : "seed"},
  {  text: "Second test todo",  opt: "seed"}
];

// Cleaning Todo collection before each test case run. Mocha runs beforeEach()
beforeEach((done) => {
  Todo.remove({}).then(() => { // mongoose to drop collection "todo"
     return Todo.insertMany(todos); // Mongoose  insert seed data to todo collection.
  }).then(() => done());    // success
  // error will be trowen out automatically ( when no connection, etc._
});


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
