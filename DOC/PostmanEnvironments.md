Task :  Configure  Two environments in the Postman tool.

1. Local  
            Where App. listening local port, and CRUD to Local Docker container.

2. Heroku
            Where App. is listening Heroku port , URL: https://secret-shelf-43614.herokuapp.com/todos  

Goal : Two App/Mongo combinations, and Postman sends HTTP requests to eather of them .
The Way: Create two environments in Postman

1. Click on "eye icon" ( next-right from "No Environment" selector OR "gear" icon )

2. Select  "Add Environment" and add two environments:

Name:                   Key            Value

Todo App Local       url       localhost:3000

Todo App Heroku    url       https://secret-shelf-43614.herokuapp.com

3. Modify  URL parts of Todo App requests ( GET , POST , GET , etc) as following:      {{url}}/todos   i.e. replace localhost:3000 by {{url}} , and so on.

4. Run  local environment in shell:
    node serve/server.js

5.  Try the  GET POST GET, etc requests in both environments.
