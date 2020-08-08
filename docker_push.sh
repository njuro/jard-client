#!/bin/bash
# script for pushing jard client Docker image to public repository
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker tag jard-client "$DOCKER_USERNAME"/jard-client
docker push "$DOCKER_USERNAME"/jard-client
