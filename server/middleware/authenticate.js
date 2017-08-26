// Refactoring authentication code from /users/me into separate function:
// server/middleware/authenticate.js
// Section 8. Lection 92.  Hashing passwords. One-way hash.
// Using bcrypt algorithm.  (npm bcryptjs  Completely JS portable library )
//    npm i  bcryptjs@2.4.3 --save
//  https://github.com/dcodeIO/bcrypt.js
// We will use Mongoose midleware , http://mongoosejs.com/docs/middleware.html
// to make sure , that passwords are hashed, before saving to the database.
//  () Mongoose Schema  pre - event to add  into user.js model .
//

var{User} = require('./../models/user');


var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

 // Finds user from users collection using token as a key.
  User.findByToken(token).then((user) => {
    if( !user ) {
          return Promise.reject();
    }
    // successfully found the user
    req.user = user;
    req.token = token;
    next();  // Continue to the next ExpressJS route
  }).catch((e) => {
      res.status(401).send(); // authentication required
      // NO GO  next()  because of the error
  });
};

module.exports = {authenticate};
