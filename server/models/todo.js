
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
   },
   //// Added "Creator" field to the documents. For Authentication purposes.
   _creator: {
        //  According to the Instructor:  "Creator" data type of ObjectId.
        // http://mongoosejs.com/docs/api.html#schema-objectid-js
        //
        type: mongoose.Schema.Types.ObjectId,
        required: true
   }
});

// Exporrt the model.
module.exports = {Todo};  // ES6 syntax
