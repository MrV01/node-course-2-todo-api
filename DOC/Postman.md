
Installing Postman API

https://www.getpostman.com/postman
Postman is the most complete toolchain for API development
The most-used REST client worldwide
Designed from the ground up to support the API developer
Intuitive user interface to send requests, save responses, add tests, and create workflows

https://www.getpostman.com/docs/

HTTP statuses:  https://httpstatuses.com/  It looks like very useful sourse.  RFCs  referencies are presented.



Start using Postman with new server/server.js

Prerequisites:

- start mongodb
- start todo app:
λ node server/server.js
Started on Port 3000
Mongoose default connection open to mongodb://192.168.99.100:32768/TodoApp
{}
{}
{ text: 'This is from Postman' }


Postman side:
1. Select  POST
2.  Enter URL: localhost:3000/todos
3.  Select body  . And select body-type  "raw" and JSON(application/json)  

4. Enter   some testing JSON code:

        {
        	"text" : "This is from Postman"
        }

The  HTTP request looks like

POST /todos HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: f245dca2-33bc-9ddc-a153-beebcffcb3a8

{
	"text" : "This is from Postman"

}
