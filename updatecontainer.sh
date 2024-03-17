#! /bin/bash

docker stop dockersite-container
docker rm dockersite-container  
docker build -t dockersite .
docker run -dit --name dockersite-container -p 8080:80 dockersite

echo "updated container"