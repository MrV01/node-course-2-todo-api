
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

  // Challenge 1.   Delete  many (All) documents from collection Users with name: "Vlad" in it.
  // deleteMany() . Returns Promise object.

  db.collection('Users').find({name: "Vlad"}).toArray().then((docs) => {
      console.log(`==============Total Vlad's Before count: ${docs.length}===============`);
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
     console.log('Unable to fetch Users with name Vlad :', err);
  });

  db.collection('Users').deleteMany({name: "Vlad"}).then((result) => {
    console.log("=============== Challenge 1. db.collection('Users').deleteMany({name: 'Vlad'})  ================================");
    console.log(result.n, result.ok);
    console.log(result);
    // Most important part is on top:
    // CommandResult {
    //    result: { n: 2, ok: 1 },  //  OK. 2   n:2  - Two documents were deleted.
    //    ......
  });

  db.collection('Users').find({name: "Vlad"}).toArray().then((docs) => {
      console.log(`=============== Total Vlad's After count: ${docs.length} ===========`);
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
     console.log('Unable to fetch Users with name Vlad :', err);
  });

    // close connection to the database.
    db.close(); // close connection to the db
} );

// Run:
// C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api  (todo-api@1.0.0)
// λ node playground\mongodb-delete-challenge1.js
//
