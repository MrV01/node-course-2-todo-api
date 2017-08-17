
var mongoose = require('mongoose');   // Mongoose library dependency

var Todo = mongoose.model('Todo', {  // Very basic cofig here see docs for many other features.
   text: {
     type: String,
     required: true,   // validator required - must be present
     minlength: 1,   // min string length
     trim: 1             // Trim leading and trailing spaces,
   },
   opt: {
     type: String,
     default: ""
   },
   completed: {
     type: Boolean,
     default: false   // validator  default value

   },
   completedAt: {
     type: Number,
     default: null  // validator  default value
   }
});

// Exporrt the model.
module.exports = {Todo};  // ES6 syntax
