
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


// {   // Structure of the User Schema entry:
//    email: 'vlad@example.com',
//    password: 'erewpiweiwoeoewioe', // crypto - hash
//    tokens: [{  // Array of tokens of the user
//       access: 'auth',   // Token is something, attached to HTTP request for authentication
//       token: 'pqopeopqoporipoqirqp'  // crypto - hash
//    }]
// }

 var UserSchema = new mongoose.Schema({
   email: {
     type: String,
     required: true,   // validator required - must be present
     minlength: 1,   // min string length
     trim: 1,             // Trim leading and trailing spaces
     unique: true,
     //  Custom validators :  http://mongoosejs.com/docs/validation.html
     validate: {
       validator: (value) => {
         // return false (invalid) / true (valid) .
         // Third party library: npm validator  https://www.npmjs.com/package/validator
         // npm install validator@8.0.0 --save
         return validator.isEmail(value);
       },
       message: '{VALUE} is not a valid email'
     }
   },
   password: {
     type: String,
     require: true,
     minlength: 6
   },
   tokens: [{
     access: {
       type: String,
       required: true
     },
     token: {
       type: String,
       required: true
     }
   }]
 });

// Overwrite method, which Defines what fields will be sent back to the user
 UserSchema.methods.toJSON = function () {
   var user = this;
   var userObject = user.toObject();

   return _.pick(userObject, ['_id', 'email']);
 };

// Add new method  which generates new token
UserSchema.methods.generateAuthToken = function () {
    var user = this;   // particular document in users collection
    var access = 'auth';
    // now sign the token
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); // Later we will move 'abc123' secret to config file
    // add token object to the array of tokens
    user.tokens.push({access,token});  // ES6 syntax
    return user.save().then( () => {  // save() returns Promise
      return token;   //  return token object when the Promise succed to chain on it, next then() call
    });
};

// User.findByToken(token)  // Finds user from users collection using token as a key.

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

try {
  decoded = jwt.verify(token,'abc123')
} catch (e) {
  // return new Promise((resolve, reject) => {
  //       reject(); // Promise.reject will guarantee that ancestor's .then() will never fired.
  //       // however .catch() will be called.
 // }
 // Equivalent of the above Promise((resolve, reject) => {} ) :
    return Promise.reject();
  };

// successfully decoded
return User.findOne({
  '_id': decoded._id,
  'tokens.token' : token,
  'tokens.access' : 'auth'
});

};

var User = mongoose.model('User', UserSchema) ; // User will be lower case "user" collection in MongoDB

module.exports = { User}; // ES6
