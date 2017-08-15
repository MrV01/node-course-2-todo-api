
const {ObjectID} = require('mongodb') ;   // for validation of the _id import mongoDB driver.

const {mongoose} = require('./../server/db/mongoose'); // Mongoose queries now enabled

 const {Todo} = require('./../server/models/todo');   // Mongoose models: todo collection

 const {User} = require('./../server/models/user');   // Mongoose models: user collection

// Lecture

// Remove all todos  from the collection
// Todo.remove({}).then((result) => {
//   console.log("Run remove {}");
//   console.log(result);
// });

// remove document by it's _id
Todo.findByIdAndRemove('598c85813cae223ee05439b8').then((result) => {
  console.log("Run  findByIdAndRemove");
   console.log(result);
});

// Remove first found  document.
// Todo.findOneAndRemove
Todo.findOneAndRemove({ text: "Something to  do"}).then((result) => {
  console.log("Run findOneAndRemove");
   console.log(result);
});

//
// Example run:
//
// λ node playground\mongoose-remove.js
// Mongoose default connection open to mongodb://192.168.99.100:32768/TodoApp
// Run  findByIdAndRemove
// { _id: 598c85813cae223ee05439b8,
//   text: 'something to do 3',
//   completedAt: null,
//   completed: false }
// Run findOneAndRemove
// { _id: 598c855e3cae223ee05439aa,
//   text: 'something to do 2',
//   completedAt: null,
//   completed: false }
