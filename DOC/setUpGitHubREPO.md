
1. Create repo from GitHub web interface.
    !!!  Do NOT init  it FROM Web interface.  GIT PUSH of the existing local REPO will occur.  

2. Push  local repo to github

      GitHUB SSH access URI:   git@github.com:MrV01/node-course-2-todo-api.git

      Create new repository on the command line:

      echo "# node-course-2-todo-api" >> README.md
      git init
      git add README.md
      git commit -m "first commit"
      git remote add origin git@github.com:MrV01/node-course-2-todo-api.git
      git push -u origin master

      Or push an existing repository from the command line:

      git remote add origin git@github.com:MrV01/node-course-2-todo-api.git
      git push -u origin master

3. 
