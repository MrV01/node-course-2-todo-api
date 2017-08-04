
const {ObjectID} = require('mongodb') ;   // for validation of the _id import mongoDB driver.

const {mongoose} = require('./../server/db/mongoose'); // Mongoose queries .

 const {Todo} = require('./../server/models/todo');   // Mongoose models: todo

// Test id , which was copied from a document object
var id = "59848628ba4e4e0e3c5c4f5c";

if( !ObjectID.isValid(id)) {
  return console.log(`Id ${id} not valid`);
};

console.log(`Id ${id} is valid`);

Todo.find( {
   _id: id   //  search , using ObjectId( id )
}).then((todos) => {
  console.log('Todos All ', todos);
});

Todo.findOne ({
  _id: id   //  search , using ObjectId( id )
}).then((todo) => {
 console.log('Todo findOne ', todo);

});

Todo.findById(id).then((todo) => {
  if(!todo) {
     return console.log(`Error: ID ${id} is not found`);
  }
    console.log('Todo findById ', todo);
}).catch((e) => console.log(e));

///
//// Challenge:  From users  collection pickup some existing  _id
///
//   User.findById   and all  ok/fail cases
//  Run the application as:
//   nodemon playground\mongoose-gueries.js
//

 const {User} = require('./../server/models/user');   // Mongoose models: todo

 var idUser = "597f585b3403711a807e3698";

 if( !ObjectID.isValid(idUser)) {
   return console.log(`Id ${idUser} not valid`);
 };
 console.log(`Id ${idUser} is valid`);

User.findById(idUser).then((user) => {
   if(!user) {
      return console.log(`Error: ID ${id} is not found`);
   }
     console.log('User findById ', user);
 }).catch((e) => console.log(e));
