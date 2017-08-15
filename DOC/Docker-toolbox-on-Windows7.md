
Docker-Toolbox overview: https://docs.docker.com/toolbox/overview/#ready-to-get-started

Docker Get started : https://docs.docker.com/get-started/#setup


Selected Docker commands on Docker- Toolbox  for Windows (7)

1. Run Kitematic tool .

2. Klick on  Docker CLI in lower left corner.

3.  In Power Shell window   set  docker-machine as default one.

PS C:\Program Files\Docker Toolbox> docker-machine create -d virtualbox default

4.  Check the docker-machine environmental  settings

PS C:\Program Files\Docker Toolbox> docker-machine env

PS C:\Program Files\Docker Toolbox> docker-machine env
$Env:DOCKER_TLS_VERIFY = "1"
$Env:DOCKER_HOST = "tcp://192.168.99.100:2376"
$Env:DOCKER_CERT_PATH = "C:\Users\Vlad\.docker\machine\machines\default"
$Env:DOCKER_MACHINE_NAME = "default"
# Run this command to configure your shell:
# & "C:\Program Files\Docker Toolbox\docker-machine.exe" env | Invoke-Expression

5. Run "this command" from  previos command output to configure your Power Shell instance to run docker commands.

& "C:\Program Files\Docker Toolbox\docker-machine.exe" env | Invoke-Expression

6. Now Power Shell is ready to run  Docker commands, like:

PS C:\Program Files\Docker Toolbox> docker --version
Docker version 1.12.5, build 7392c3b

PS C:\Program Files\Docker Toolbox> docker run -it ubuntu:14.04 bash
Unable to find image 'ubuntu:14.04' locally
14.04: Pulling from library/ubuntu
7ee37f181318: Pull complete
df5ffabe5e97: Pull complete
ae2040ed51a1: Pull complete
3ce7010d244b: Pull complete
2538b201d2a6: Pull complete
Digest: sha256:13eecbc0e57928c1cb3ccca3581e2a6f4b0f39c1acf5a279e740e478accd119b
Status: Downloaded newer image for ubuntu:14.04
root@1ea220e6b3db:/# exit
