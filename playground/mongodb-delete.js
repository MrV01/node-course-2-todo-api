
// const MongoClient = require('mongodb').MongoClient;
// Extended equvalent in ES6:
const {MongoClient, ObjectID} = require('mongodb');

// Docker Container Mongo  is running at default test database,
// MongoClient.connect('mongodb://192.168.99.100:32768/test');
// However, we create new database  TodoApp  right here,from MongoClient.connect() method.
// Nothing else (except privileges  I guess ) required to create new database :-)

const mongodbConnectStr = 'mongodb://192.168.99.100:32768/TodoApp';

MongoClient.connect(mongodbConnectStr, ( err, db) => {
  if(err) {
    return console.log(`Unable to connect to mongodb server at ${mongodbConnectStr}`);
  }
  console.log(`Connected to monpdb server at ${mongodbConnectStr}`);

  // deleteMany() . Returns Promise object.
  db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
    console.log("=============== deleteMany()  ================================");
    console.log(result);
    // Most important part is on top:
    // CommandResult {
    //    result: { n: 2, ok: 1 },  //  OK. 2   n:2  - Two documents were deleted.
    //    ......
  });

  // deleteOne()  . Returns Promise object.
  db.collection('Todos').deleteOne({text: "Something to do"}).then((result) => {
    console.log("==================  deleteOne() =============================");
    console.log(result);
    // One document deleted successfully:
    // CommandResult {
    //   result: { n: 1, ok: 1 },
    //  ....
    //     message:
    //  Response {
      // ....
      // ... },
      // deletedCount: 1 }
  });

  // findOneAndDelete()     returns Promise object AND deleted document.
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    console.log("================= findOneAndDelete()    ==============================");
    console.log(result);
  });

    // close connection to the database.
    db.close(); // close connection to the db
} );

// Run:
// C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api  (todo-api@1.0.0)
// λ node playground\mongodb-fetch.js
//
