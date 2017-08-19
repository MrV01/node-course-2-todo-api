// Refactoring authentication code from /users/me into separate function:
// server/middleware/authenticate.js

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
      // NO next()  because of hte error
  });
};

module.exports = {authenticate}; 
