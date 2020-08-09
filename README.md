#jard-client
![jard](public/assets/jard-logo-name.png)

[![Build Status](https://travis-ci.org/njuro/jard-client.svg?branch=master)](https://travis-ci.org/njuro/jard-client)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=njuro_jard-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=njuro_jard-client)

## Basic FAQ

### What is jard-client?

**jard-client** is a frontend for **jard**, an anonymous imageboard software. For more information about the project check out [the main jard repository](https://github.com/njuro/jard).

### What technologies is jard-client built with?

This client is written in `TypeScript 3.x` (superset of JavaScript) with `React 16.x` as main library. Requests to REST API are made using `axios` library, forms are handled by `react-hook-form` and routing by `react-router`. Components are styled with `styled-components`. Design components from `semantic-ui-react` library are also used. More libraries are used as defined in _package.json_ file.

Master branch is regulary deployed to `Heroku`.

## Deploying your own instance

There are several ways to deploy this client instance:

### Heroku

Probably the most convenient way is to deploy straight to Heroku (PaaS) with this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/njuro/jard-client)

### Docker (client, server, database)

If you prefer to deploy locally on your own computer/VPS, you can use `docker-compose` to deploy the whole jard stack at once.

See [this section in main repository](https://github.com/njuro/jard/#docker--client-server-database) for instructions.

### Docker (client only)

Alternatively, you could deploy just the client container. This requires to have set up PostgresSQL database and linking it via enviroment variables.

1. Download / copy the [.env-template](https://github.com/njuro/jard-client/blob/master/.env-template) file, rename it to `.env` and fill in the enviroment variables.
2. Run commands described in [docker_run.sh](https://github.com/njuro/jard-client/blob/master/docker_run.sh)
3. Wait ~2 minutes, afterwards you should have jard client running at port `3000`

## Contributing

There are several ways for contributing to the project. I will be thankful for all of them.

- Star the repository and share the word
- Open a new issue if you encounter a bug or have feature/improvement request
- Contribute to the code - see [CONTRIBUTING.md](https://github.com/njuro/jard-client/blob/master/CONTRIBUTING.md) for details
