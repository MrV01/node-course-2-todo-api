
Setting up testing npm modules.

1. Install locally following npms  for testing purposes only:

https://www.npmjs.com/package/expect
https://www.npmjs.com/package/mocha
https://www.npmjs.com/package/nodemon
https://www.npmjs.com/package/supertest

npm i expect@1.20.2   mocha@3.5.0  nodemon@1.11.0  supertest@3.0.0   --save-dev

2. Create test case in ./tests/server.test.js

3. Modify ./server.js . Export something from the module, like  whole application object. at the end of the file:  

  module.exports = {app};  // For testing purposes

4. Modify package.json

"scripts": {
  "test": "mocha server/**/*.test.js",
  "test-watch": "nodemon --exec 'npm test' "
},

5. Run tests from cmd.exe of Windows

      npm run test-watch


/////// example of successful test run:

> todo-api@1.0.0 test C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api
> mocha server/**/*.test.js

Started on Port 3000
  Post /todos
Mongoose default connection open to mongodb://192.168.99.100:32768/TodoApp
    √ should create a new todo (132ms)


  1 passing (205ms)

[nodemon] clean exit - waiting for changes before restart

///////////////// example of failing test run:

> todo-api@1.0.0 test C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api
> mocha server/**/*.test.js



Started on Port 3000
  Post /todos
Mongoose default connection open to mongodb://192.168.99.100:32768/TodoApp
    1) should create a new todo


  0 passing (238ms)
  1 failing

  1) Post /todos should create a new todo:
     Error: Expected 'Test (super) todo text random number: 4' to be 'Test (super) todo text random number: 42'
      at assert (node_modules\expect\lib\assert.js:29:9)
      at Expectation.toBe (node_modules\expect\lib\Expectation.js:66:28)
      at request.post.send.expect.expect (server\tests\server.test.js:24:33)
      at Test._assertFunction (node_modules\supertest\lib\test.js:281:11)
      at Test.assert (node_modules\supertest\lib\test.js:171:18)
      at Server.assert (node_modules\supertest\lib\test.js:131:12)
      at emitCloseNT (net.js:1639:8)
      at _combinedTickCallback (internal/process/next_tick.js:99:11)
      at process._tickCallback (internal/process/next_tick.js:161:9)



npm ERR! Test failed.  See above for more details.
[nodemon] app crashed - waiting for file changes before starting...
