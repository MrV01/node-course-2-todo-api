
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


// {   // Structure of the User Schema entry:
//    email: 'vlad@example.com',
//    password: 'erewpiweiwoeoewioe', // crypto - hash
//    tokens: [{  // Array of tokens of the user
//       access: 'auth',   // Token is something, attached to HTTP request for authentication
//       token: 'pqopeopqoporipoqirqp'  // crypto - hash
//    }]
// }
// !!!!  .statics.  and  .methods.  methods definitions  in mongoose Schema
// <Schema Name>.methods.<function>  -  Defines  functions on
//                                                              documents( instances) created from  the Model
// <Schema Name > .statics. <function>  - Defunes functions on "Models" of the particular "Schema"
// (http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html )

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
   var user = this;  // particular document in users collection
   var userObject = user.toObject();

   return  _.pick(userObject, ['_id', 'email']);
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

// Add new method which compares password and hash in the user's document.
//
// UserSchema.methods.comparePasswordAndHash = function(pwd, token) {
//   var user = this;  // particular document in users collection
//
// };

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

// User.findByEmail(email)  // Finds user from users collection using Email as a key
UserSchema.statics.findByEmail = function (body) {
   var User = this;  //  Model instance.
    // Search by:
   var uEmail = body.email;
   var uPassword = body.password;

    return User.findOne({  // find document with uEmail in the Model
            'email':  { $eq : uEmail }
       },'password tokens').then( (user) => {
         // console.log(user);
         if(!user) {
           return Promise.reject();   // failed instantly ( does not exist).
         }
        // Compare  password  and 'password' -hash from the 'users' collection
        // compare the password and hash
          //  VVV:  syncronous solution . bcrypt doe not support Promises
          //  if( bcrypt.compareSync(uPassword, user.password ) ){
          //     return  user.tokens[0].token;
          //  };
          //  return Promise.reject();
          // The Better Asyncronius solution's idea from the Instructor:
          return new Promise((resolve, reject) => {
              bcrypt.compare(uPassword, user.password, (err, res) => {
                if(err) {
                  reject(err);
                } else if (res === true) {
                  resolve(user);
                } else {
                  reject(res);
                }
              });
          });
       });
  };

// Register  Mongoose  Schema event ( pre) .
// Example from: http://mongoosejs.com/docs/middleware.html
// var schema = new Schema(..);
// schema.pre('save', function(next) {
//   // do stuff
//   next();
// });

UserSchema.pre('save', function (next) {
  var user = this; //  event defined on User Model  level
   if( user.isModified('password') ) {
     let password =  user.password;  // assume password is in clean text
     //Salt generation.
     bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(password, salt, (err, hash) => {
            user.password = hash;
            next();
       });
     });
   } else {  // password is not changed, then next()
     next();
   }
});


var User = mongoose.model('User', UserSchema) ; // User will be lower case "user" collection in MongoDB

module.exports = { User}; // ES6 syntax
