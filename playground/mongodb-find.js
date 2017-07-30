
// const MongoClient = require('mongodb').MongoClient;
// Extended equvalent in ES6:
const {MongoClient, ObjectID} = require('mongodb');

// Docker Container Mongo  is running at default test database,
// MongoClient.connect('mongodb://192.168.99.100:32768/test');
// However, we create new database  TodoApp  right here,from MongoClient.connect() method.
// Nothing else (except privileges  I guess ) required to create new database :-)

MongoClient.connect('mongodb://192.168.99.100:32768/TodoApp', ( err, db) => {
  if(err) {
    return console.log("Unable to connect to mongodb server");
  }
  console.log("Connected to monpdb server");

  ///
  // Fetching data from the database.
  ///
  // Fetach everything from the collection:
  //             toArray() returns Promise of array of the documents.
  //           So, we use .then()  method.

// Query All  Todos
  db.collection('Todos').find({}).toArray().then((docs) => {
      console.log('Todos Whole list: ');
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
     console.log('Unable to fetch Todos', err);
  });

// Query completed Todos
  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
      console.log('Todos Not Completed yet: ');
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
     console.log('Unable to fetch Todos', err);
  });

  // Query by _id
    db.collection('Todos').find({
       _id: new ObjectID('597e4c0be7651a335152329e')
    }).toArray().then((docs) => {
        console.log('Todos by ID: ObjectId("597e4c0be7651a335152329e") ');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
       console.log('Unable to fetch Todos', err);
    });

    //
    // Method .find() returns a Cursor. http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html
    // Now we count all the todo in Todos collection:
    //
    console.log("Challenge -------------------------------------------------------------------");
    db.collection('Users').find({ name: "Vlad" }).toArray().then( (docs) => {
      console.log(`name Vlad Users`);
      console.log(JSON.stringify(docs, undefined, 2));
      console.log(`name Vlad Users Count: ${docs.length} `);
    }, (err) => {
       console.log('Unable to fetch Users', err);
    });




    // close connection to the database.
    db.close(); // close connection to the db
} );

// Run:
// C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api  (todo-api@1.0.0)
// λ node playground\mongodb-fetch.js
//
