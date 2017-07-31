
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

  // Challenge 2.   Delete one document  from collection Users with _id: ObjectId("597e3a3c3961a90164a1b0a5") .
  ///   aka name : "Mike"
  // findOneAndDelete()     returns Promise object AND deleted document.
  //
  var findObjectID = new ObjectID("597e3a3c3961a90164a1b0a5");

  db.collection('Users').find({ _id : findObjectID  }).toArray().then((docs) => {
      console.log(`============== Before count: ${docs.length}===============`);
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
     console.log('Unable to fetch Users with _id provided :', err);
  });
  // findOneAndDelete()     returns Promise object AND deleted document.
  db.collection('Users').findOneAndDelete({ _id : findObjectID  }).then((result) => {
    console.log("================= Challenge 2.    db.collection('Users').findOneAndDelete()    =====================");
    console.log(result);
      //   { lastErrorObject: { n: 1 },
      // value:
      //  { _id: 597e3a3c3961a90164a1b0a5,
      //    name: 'Mike',
      //    age: 33,
      //    location: 'ATL' },
      // ok: 1 }
  });

  db.collection('Users').find({  _id : findObjectID }).toArray().then((docs) => {
      console.log(`=============== After count: ${docs.length} ===========`);
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
     console.log('Unable to fetch Users with _id provided :', err);
  });
    // close connection to the database.
    db.close(); // close connection to the db
} );

// Run:
// C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api  (todo-api@1.0.0)
// λ node playground\mongodb-delete-challenge2.js
//
