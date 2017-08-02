
var mongoose = require('mongoose');

// Model User ( just email)
var User = mongoose.model('User', { // user will be lower case of collection. in MongoDB
   email: {
     type: String,
     required: true,   // validator required - must be present
     minlength: 1,   // min string length
     trim: 1             // Trim leading and trailing spaces,
   }
});


module.exports = { User}; // ES6
