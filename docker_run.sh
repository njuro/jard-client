#!/bin/bash
# script for running jard client as docker container
# don't forget to set enviroment variables in .env file first
docker run -itd --network=host --env-file .env --name jard-client njuro/jard-client:latest