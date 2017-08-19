
//  Third party module:  https://www.npmjs.com/package/crypto-js
//  npm i crypto-js@3.1.9-1  --save
// We use SHA-256 encryption to play with ,
//  Standard JWT ( JSON WEB TOKEN ) module: https://www.npmjs.com/package/jsonwebtoken
//   npm i  jsonwebtoken@7.4.3 --save
//  JWT  RFC 7519  web site: https://jwt.io/
//  Nice feature:  Paste token there for decoding
//
//////  Password hashing for storage in the database:  https://github.com/dcodeIO/bcrypt.js
//   npm i  bcryptjs@2.4.3 --save
//

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  //  https://github.com/dcodeIO/bcrypt.js

var password = '123abc!';

//Salt generation.
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log("hash: " , hash);
  });
});
// console
//  hash:  $2a$10$751AjUD4kWqMD574woSFi.ZUHBmGo0WCPInkYbQXeASgmRAXwOgjq
// Salt$number of rounds$hash itselt
// Now test it:
var hashedPassword =
'$2a$10$751AjUD4kWqMD574woSFi.ZUHBmGo0WCPInkYbQXeASgmRAXwOgjq';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log("res", res);
});

bcrypt.compare('123456', hashedPassword, (err, res) => {
  console.log("res", res);
});


// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, '123abc');   // creates hash
// console.log(token);
//
// var decoded =  jwt.verify(token, '123abc');  // verify that token was not altered
// console.log('Decoded',decoded);
//

//  Below  is demonstrate how the  JWT ( JSON WEB TOKEN ) standard works:
// Note: Using  crypto , and crypto-js  instead of  jsonwebtoken ( ready to eat  :-)
//
// const crypto =  require('crypto');
// const {SHA256} = require('crypto-js');
//
//
// var message = " I am a user number 6"
// var hash = SHA256(message).toString();
//
// console.log('----------------');
// console.log(`| Message: ${message} |`, ` |   Hash: ${hash} |`);
//
// // Random string: https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
// var somesecret  = crypto.randomBytes(48).toString('hex');
// console.log(`Some Random Secret : ${somesecret} `);
// // var somesecret = 'somesecret';
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + somesecret).toString()
// };
//
// // Attempt to hack in the middle
// // token.data.id = 5 ;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
// // End of the hack in the middle
//
// var resultHash = SHA256(JSON.stringify(token.data) + somesecret).toString();
//
// if( resultHash === token.hash) {
//   console.log("Data was not changed");
// } else {
//   console.log('Data was Changed. Do not trust!');
// }
