
// const MongoClient = require('mongodb').MongoClient;
// Extended equvalent in ES6:
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();  // We generate new ObjectID before creating the document in the collection.
console.log("Uniq Object ID created in advance: (not used thought) ", obj);   // This way we can have _id  to insert to some other documents for instance.

// Docker Container Mongo  is running at default test database,
// MongoClient.connect('mongodb://192.168.99.100:32768/test');
// However, we create new database  TodoApp  right here,from MongoClient.connect() method.
// Nothing else (except privileges  I guess ) required to create new database :-)

MongoClient.connect('mongodb://192.168.99.100:32768/TodoApp', ( err, db) => {
  if(err) {
    return console.log("Unable to connect to mongodb server");
  }
  console.log("Connected to monpdb server");
  // However Mongo is not going to create new database ( like empty database), until we add data in it.

 // Adding some data into a collection( Todos) which may or may not exists.
 //  of a database( TodoApp), which may or may not exist

//
// db.collection().insertOne( Object, callback function )
//
 db.collection('Todos').insertOne({  // The one object to insert
           text: 'Something to do',
           completed: false
     }, (err,result) => {   // callback from async operation has been arrived
          if(err) { // errror
            return console.log("Unable to insert todo", err );
          }
          // success returns :  Object      insertOneWriteOpResult
          // http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~insertOneWriteOpResult
          // Where ops ops	Array.<object>
          // All the documents inserted using insertOne/insertMany/replaceOne.
          // Documents contain the _id field if forceServerObjectId == false for insertOne/insertMany
          console.log(JSON.stringify(result.ops));
    });

    /// Challenge:  insert new doc into new Users collection  (name, age , location )
    ///
    db.collection('Users').insertOne({
        name: "Vlad",
        age: 50,
        location: "ATL"
     }, (err, result) => {
        if(err) {  //error
              return console.log("Unable to insert user", err);
        }
            // success
            console.log( "Inserted: ", JSON.stringify(result.insertedCount) );
            console.log(JSON.stringify(result.ops));
            console.log(JSON.stringify(result.insertedIds));
            console.log(JSON.stringify( result.result));
    });

    // _id  property of MongoDB  is randomly generated UNIQUE identifier.
    //  https://docs.mongodb.com/manual/reference/method/ObjectId/
    //  12bytes:
    //  4 bytes - Epoch timestamp
    //  3 bytes - mashine identifier
    //  2 bytes -  process id
    //  3 bytes  - random value
    // Interesting feature:  _id  can be set  for the document during creation.
    db.collection('Users').insertOne({
    //        _id:12345,  // Use  Mongo automatically generated unique _id
        name: "Vlad 12345 timestamp",
        age: 52,
        time: Date.now(),
        location: "Cumming"
     }, (err, result) => {
        if(err) {  //error
              return console.log("Unable to insert user", err);
        }
        // success
        console.log( "Inserted: ", JSON.stringify(result.insertedCount) );
        console.log(result.ops[0]._id.getTimestamp());
        console.log(JSON.stringify(result.insertedIds));
        console.log(JSON.stringify( result.result));
   });



    // close connection to the database.
    db.close(); // close connection to the db
} );

// Run:
// C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api  (todo-api@1.0.0)
// λ node playground\mongodb-connect.js
// Connected to monpdb server
