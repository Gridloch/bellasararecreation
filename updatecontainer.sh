#! /bin/bash

docker stop dockersite-container
docker rm dockersite-container  
docker build -t dockersite .
docker run -dit --name dockersite-container -p 0.0.0.0:80:80 dockersite

echo "updated container"