
1. To have heroku prepared for MongoDB, install add-on

- Open Heroku web site: https://dashboard.heroku.com/apps  and look for addons:
We will use addon  mongo LAB (mLAB) free plan called "sandbox"

- create new application from terminal command line: heroku create

C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api (master) (todo-api@1.0.0)
λ heroku create
Creating app... done, secret-shelf-43614
https://secret-shelf-43614.herokuapp.com/ | https://git.heroku.com/secret-shelf-43614.git

C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api (master) (todo-api@1.0.0)
λ

- create addon instance by command:  

    heroku addons:create mongolab:sandbox

 ( Have an ERROR :
     Creating mongolab:sandbox on secret-shelf-43614... !
 !    Please verify your account to install this add-on plan (please enter a credit card)
 )  For more
 !    information, see https://devcenter.heroku.com/categories/billing Verify now at
 !    https://heroku.com/verify

Workaround (According to an QA below.)
Created  mLab.com sandbox account  directly from mLab https://mlab.com URI: mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001
Database name defined by mLab : test001  , collections are dynamic as usual.

2. Now modify configs in the todo app ( PORT, MongoDB URI, etc)

Another workaround:  is to set up Mongo URI in Heroku application directly. In order to remove  passwords from source code.
OR
How to set up  process.env.MONGODB_URI variable in Heroku, when mLab add-on is not avaliable (not free).
" You could also set the environment variable on Heroku directly. Then you won't need to keep this sensitive info in the code itself. That would be:"
   heroku config:set MONGODB_URI="mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001"


Source: https://devcenter.heroku.com/articles/config-vars

 Example:
 C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api (master) (todo-api@1.0.0)

λ heroku config
=== secret-shelf-43614 Config Vars

heroku config:set MONGODB_URI=mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001

C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api (master) (todo-api@1.0.0)
λ heroku config:set MONGODB_URI=mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001
Setting MONGODB_URI and restarting secret-shelf-43614... done, v4
MONGODB_URI: mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001

C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api (master) (todo-api@1.0.0)
λ heroku config
=== secret-shelf-43614 Config Vars
MONGODB_URI: mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001

C:\Users\Vlad\Documents\PROG\HTML5\sites\completeNodeJsDeveloperCourse2\node-todo-api (master) (todo-api@1.0.0)
λ

Success!!!
 MONGODB_URI is set now for the  Heroku deployment secret-shelf-43614

3. Push changes to Github & Heroku
       - git push
       - git push heroku master
       The app URL : https://secret-shelf-43614.herokuapp.com/todos

4. Heroku commands
        - heroku logs
        - heroku config
        - heroku create // Create new application

       λ git push
       Counting objects: 7, done.
       Delta compression using up to 4 threads.
       Compressing objects: 100% (6/6), done.
       Writing objects: 100% (7/7), 1014 bytes | 0 bytes/s, done.
       Total 7 (delta 4), reused 0 (delta 0)
       remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
       To github.com:MrV01/node-course-2-todo-api.git
          0b0198b..edab521  master -> master
       Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
       λ git push heroku master
       Counting objects: 87, done.
       Delta compression using up to 4 threads.
       Compressing objects: 100% (79/79), done.
       Writing objects: 100% (87/87), 36.31 KiB | 0 bytes/s, done.
       Total 87 (delta 36), reused 0 (delta 0)
       remote: Compressing source files... done.
       remote: Building source:
       remote:
       remote: -----> Node.js app detected
       remote:
       remote: -----> Creating runtime environment
       remote:
       remote:        NPM_CONFIG_LOGLEVEL=error
       remote:        NPM_CONFIG_PRODUCTION=true
       remote:        NODE_VERBOSE=false
       remote:        NODE_ENV=production
       remote:        NODE_MODULES_CACHE=true
       remote:
       remote: -----> Installing binaries
       remote:        engines.node (package.json):  8.1.3
       remote:        engines.npm (package.json):   unspecified (use default)
       remote:
       remote:        Resolving node version 8.1.3...
       remote:        Downloading and installing node 8.1.3...
       remote:        Detected package-lock.json: defaulting npm to version 5.x.x
       remote:        Bootstrapping npm 5.x.x (replacing 5.0.3)...
       remote:        npm 5.3.0 installed
       remote:
       remote: -----> Restoring cache
       remote:        Skipping cache restore (not-found)
       remote:
       remote: -----> Building dependencies
       remote:        Installing node modules (package.json + package-lock)
       remote:        added 81 packages in 4.223s
       remote:
       remote: -----> Caching build
       remote:        Clearing previous node cache
       remote:        Saving 2 cacheDirectories (default):
       remote:        - node_modules
       remote:        - bower_components (nothing to cache)
       remote:
       remote: -----> Build succeeded!
       remote: -----> Discovering process types
       remote:        Procfile declares types     -> (none)
       remote:        Default types for buildpack -> web
       remote:
       remote: -----> Compressing...
       remote:        Done: 19.2M
       remote: -----> Launching...
       remote:        Released v3
       remote:        https://secret-shelf-43614.herokuapp.com/ deployed to Heroku
       remote:
       remote: Verifying deploy... done.
       To https://git.heroku.com/secret-shelf-43614.git
        * [new branch]      master -> master
       Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
       Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)
       λ heroku logs
       2017-08-04T21:05:03.356550+00:00 app[api]: Initial release by user vladv454@gmail.com
       2017-08-04T21:05:03.356550+00:00 app[api]: Release v1 created by user vladv454@gmail.com
       2017-08-04T21:05:03.497544+00:00 app[api]: Enable Logplex by user vladv454@gmail.com
       2017-08-04T21:05:03.497544+00:00 app[api]: Release v2 created by user vladv454@gmail.com
       2017-08-09T17:58:59.000000+00:00 app[api]: Build started by user vladv454@gmail.com
       2017-08-09T17:59:29.225822+00:00 app[api]: Release v3 created by user vladv454@gmail.com
       2017-08-09T17:59:29.225822+00:00 app[api]: Deploy edab5218 by user vladv454@gmail.com
       2017-08-09T17:59:29.250613+00:00 app[api]: Scaled to web@1:Free by user vladv454@gmail.com
       2017-08-09T17:58:59.000000+00:00 app[api]: Build succeeded
       2017-08-09T17:59:31.259732+00:00 heroku[web.1]: Starting process with command `npm start`
       2017-08-09T17:59:33.375602+00:00 app[web.1]:
       2017-08-09T17:59:33.375611+00:00 app[web.1]: > todo-api@1.0.0 start /app
       2017-08-09T17:59:33.375612+00:00 app[web.1]: > node server/server.js
       2017-08-09T17:59:33.375613+00:00 app[web.1]:
       2017-08-09T17:59:33.923829+00:00 app[web.1]: Started up at Port 38429
       2017-08-09T17:59:33.950531+00:00 app[web.1]: Db.prototype.authenticate method will no longer be available in the next major release 3.x as MongoDB 3.6 will only allow auth against users in the admin db and will no longer allow multiple credentials on a socket. Please authenticate using MongoClient.connect with auth credentials.
       2017-08-09T17:59:34.126222+00:00 app[web.1]: Mongoose default connection open to mongodb://test1:Hjk12345@ds027825.mlab.com:27825/test001
       2017-08-09T17:59:34.898261+00:00 heroku[web.1]: State changed from starting to up
       2017-08-09T18:00:33.503926+00:00 heroku[router]: at=info method=GET path="/" host=secret-shelf-43614.herokuapp.com request_id=162f0e8e-4fff-4d6b-93db-f7daf03e82ed fwd="24.98.144.65" dyno=web.1 connect=0ms service=33ms status=404 bytes=383 protocol=https 2017-08-09T18:00:33.901752+00:00 heroku[router]: at=info method=GET path="/favicon.ico" host=secret-shelf-43614.herokuapp.com request_id=cd78ea03-6998-4eb9-bcbc-fbafcc4385f9 fwd="24.98.144.65" dyno=web.1 connect=0ms service=5ms status=404 bytes=394 protocol=https
       2017-08-09T18:01:09.568643+00:00 heroku[router]: at=info method=GET path="/todos" host=secret-shelf-43614.herokuapp.com request_id=fd8d9566-22b6-4f2d-a5d9-e9b325466020 fwd="24.98.144.65" dyno=web.1 connect=1ms service=40ms status=200 bytes=218 protocol=https
       Vlad@Vlad-HPlaptop ~/Documents/PROG/HTML5/sites/completeNodeJsDeveloperCourse2/node-todo-api (master)

================================================================
QA  Andrew's answer:
https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/t/lecture/5677890?start=0


Nishant  · a month ago
Hi Anubhav,

I had the same problem. So, I created an account directly with mlabs through their website mlab.com (it doesn't require credit card).

(1) Once you have created an account, you can create a database, Click on it and find a tab titled "user". click on this tab to add a user by providing a name and password.



(2) You can now use the key they provide for the new database which looks like so:

mongodb://<USER>:<PASSWORD>@ds143342.mlab.com:43342/your-project-name



(2) Use the user and password you just created and pop them in the above key,  it should now look similar to:

mongodb://randomUsername:randomPassword@ds143342.mlab.com:43342/your-project-name



(3) Back in your server file, instead of writing mongoose.connect(mongodb://localhost:27017....etc) , you can now simply say,

mongoose.connect("mongodb://randomUsername:randomPassword@ds143342.mlab.com:43342/your-project-name").

This will tell mongoose to use the online database with mlab to store your data.



(4) Alternatively, you can also use the terminal to setup the same. Here is a link to the official docs, if you get stuck:

http://docs.mlab.com/connecting/



Happy Coding!

Mark as helpful (5)
Andrew Mead

Andrew — Instructor  · a month ago
Nice writeup Nishant!

P.S. There's also a workaround thread here that's worth checking out. It outlines the same process above.

Mark as helpful (1)
Anubhav Arora

Anubhav  · a month ago
ok. thanks guys.

Mark as helpful
