Cut and paste of Id and tokens in/to Postman requests is a tedios chore

1. Start Postman snd run SignUp  call ( create user )
    aka  POST /users
2. In "Tests" section of POST /users  Write two scripting lines
 - Select token from auth responce header: x-auth = <token>
 - Put the token into environment variable ( env  variable 'x-auth' in the example below. )

 Example from the instructor:
    var token = postman.getResponseHeader('x-auth');
     postman.setEnvironmentVariable('x-auth', token);
   ( See more examples at: https://www.getpostman.com/docs/postman/scripts/test_examples )

3. Use  environment variable  in other REST request(s).
    Example: GET /todos
    Uses x-auth env variable in 'x-auth' header like following.
    Headers -> x-auth -> {{x-auth}}

4. Login request. AKA  POST /users/login  . Insert following code snippet, analogous to  POST /users  ( aka Create user )

  var token = postman.getResponseHeader('x-auth');
   postman.setEnvironmentVariable('x-auth', token);

5. Add   header  "x-auth"   {{x-auth}}  to   private REST endpoints.  
 GET /todos  , POST /todos , GET /todos/:id,
  DELETE  /todos/:id  , PATCH /todos/:id

======================================================
6.    Document ID variable  processing.  POST /todos  aka "Create Todo"  retuns  new  document ID  in response.
Example:
<!-- {
    "__v": 0,
    "text": "Data to be submitted into MongoDB collection todos FROM 18181818==============XXXXXXXXXXX===== Postman N 777777",
    "_creator": "59a58f92f33b2d00119bdfd2",
    "_id": "59a5b28882dbff001107eb11",
    "completedAt": null,
    "completed": false,
    "opt": ""
} -->

 Let's grab the recent document ID into Postman env. variable!
In "Tests" section of POST /todos create following snippet to grab new document ID into environment variable todoID.

<!-- var body = JSON.parse(responseBody);
postman.setEnvironmentVariable('todoID', body._id); -->

7.  Now let's modify URL portion of ID's in following requests like  {{url}}/todos/{{todoID}}
  GET /todos/:id  ,  DELETE /todos/:id , PATCH /todos/:id  


It is higly recommended For any RESTful interface  for  Testing purposes.
