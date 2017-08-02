// Creating new todo DEMO
// var newTodo = new Todo( {
//   text: 'Cook Dinner, and Breakfast'
// });
//
// newTodo.save().then((doc) => {
//   console.log("Saved todo", JSON.stringify(doc, undefined, 2));
// }, (error) => {
//   console.log("Unable to save Todo");
// });

        // node server\server.js
        // Saved todo { __v: 0, text: 'Cook Dinner', _id: 597ecba392bfe61954adf199 }

// __v: 0   Is internal Mogoose  version number. Keeps track of models changes over time.

/// Challege 1: Fill out all three fields.
// var newTodo2 = new Todo( {
//   text: 'Goto Sleep',
//   completed: false,
//   completedAt: 1
// });
//
// newTodo2.save().then((doc) => {
//   console.log("Saved todo 2 ", JSON.stringify(doc, undefined, 2));
// }, (error) => {
//   console.log("Unable to save Todo 2",error);
// });

        // λ node server\server.js
        // Saved todo { __v: 0, text: 'Cook Dinner', _id: 597ece048e837a1c3cee693e }
        // Saved todo 2 { __v: 0,
        //   text: 'Goto Sleep',
        //   completed: false,
        //   completedAt: 1,
        //   _id: 597ece048e837a1c3cee693f }

// Now  empty todo.  How to avoid it in momgoose, because it does not make much sense :-)
// Validators and shemas to the resquie :-)
// http://mongoosejs.com/docs/validation.html
//  http://mongoosejs.com/docs/guide.html
//
var newTodo3 = new Todo({
   text: '      Something todo trimmed     '
/// Attention!! type casting does exist inside mongoose text : true will be converted to text: "true"
//    text: true

  //   Saved todo 3  {
  // "__v": 0,
  // "text": "true",
  // "_id": "597f52dccdc4a20af0a7a6d3",
  // "completedAt": null,
  // "completed": false
  // }
});

newTodo3.save().then((doc) => {
  console.log("Saved todo 3 ", JSON.stringify(doc, undefined, 2));
}, (error) => {
  console.log("Unable to save Todo 3",error);
});

// Challenge 2.
// Create User model
//  email - require it - trim it - set type - set min length of  1

// Create document - Object,  based on model User1
var newUser1 = new User1({
    email: "           vlad@example.com           "
});

// Save the document  newUser1
newUser1.save().then((doc) => {
  console.log("Saved newUser1 :", JSON.stringify(doc, undefined, 2));
}, (error) => {
  console.log("Unable to save newUser1", error);
});
