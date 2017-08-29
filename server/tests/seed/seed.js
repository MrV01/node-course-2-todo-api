const {ObjectID} = require('mongodb');
const  jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

// Seed data for users collection:
const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'vladSeedData01@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'},process.env.JWT_SECRET).toString()
  }]
},{
  _id: userTwoId,
  email:  'vladSeedData02@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'},process.env.JWT_SECRET).toString()
  }]
}];

// Seed data for todo collection:
//  Add _id   property (new)
var todos = [
  { _id: new ObjectID(),
    text: "First test todo",      opt : "seed",
    _creator: userOneId
  },

  { _id: new ObjectID(),
    text: "Second test todo",  opt: "seed",
    completed : true ,
    completedAt : 33,
    _creator: userTwoId
  }
];

// Function for beforeEach() of  Mocha
const populateTodos = (done) => {
  Todo.remove({}).then(() => { // mongoose to drop collection "todo"
     return Todo.insertMany(todos); // Mongoose  insert seed data to todo collection.
  }).then(() => done());    // success
  // error will be trowen out automatically ( when no connection, etc._
};

const populateUsers = (done) => {
  User.remove({}).then(() => {  // clean up users collection and populate by seeds
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    // now wait for .save() of mongoose  middleware finish
      return Promise.all([userOne,  userTwo]);
  }).then(() => done() ); // success of  Promise.all() promises.
};

module.exports = {todos, populateTodos, users, populateUsers};
