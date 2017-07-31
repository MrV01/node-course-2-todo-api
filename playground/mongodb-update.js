
// const MongoClient = require('mongodb').MongoClient;
// Extended equvalent (destructurer) in ES6:
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

  // findOneAndUpdate(filter object, update object, options, callback function)
  // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
  // Find a document and update it in one atomic operation, requires a write lock for the duration of the operation.
  // Returns:
  // Promise if no callback passed
  //

      db.collection("Todos").findOneAndUpdate({  // filter object
        // filter  document with _id   aka Something to do
        _id : new ObjectID("597e3263f1293e189c7e9d1e")
      }, {  // update object (https://docs.mongodb.com/v3.2/reference/operator/update-field/)
        $set: {
          completed: true
        }
      }, { // options object
        returnOriginal: false
      }).then((result) => {
        console.log(result);
                      //         λ node playground\mongodb-update.js
                      // Connected to monpdb server at mongodb://192.168.99.100:32768/TodoApp
                      // { lastErrorObject: { updatedExisting: true, n: 1 },
                      //   value:
                      //    { _id: 597e3263f1293e189c7e9d1e,
                      //      text: 'Something to do',
                      //      completed: true },
                      //   ok: 1 }
      });

      //
      /// Quick challenge .
      /// In TodoApp database  collection Users  :
      //    1. Modify  Jen to some other.
      //    2. increment age of the object by 1.
      //
      console.log('======== Quick challenge:  ObjectId("597e39b5126c1115dcebf166")==========');
      db.collection("Users").findOneAndUpdate({  // filter object
        // filter  document with _id   aka  Jen  = ObjectId("597e39b5126c1115dcebf166")
        _id : new ObjectID("597e39b5126c1115dcebf166")
      }, {  // update object (https://docs.mongodb.com/v3.2/reference/operator/update-field/)
        $set: {
          name: "Jen Mod VVV"
        },
        $inc : {
          age : 1
        }
      }, { // options object
        returnOriginal: false
      }).then((result) => {
        console.log(result);
      });


  // close connection to the database.
    db.close(); // close connection to the db
} );

// Run:
// C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api  (todo-api@1.0.0)
// λ node playground\mongodb-update.js
//
