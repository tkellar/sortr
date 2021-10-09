# Sortr Development

## Getting Started

This project can be run in a development environment using `docker-compose`.
To get started, run

```sh
$ npm run docker:build
```

This will build an image for the server component of the application based on the
Dockerfile found at `server/Dockerfile`. You will need to rerun this command any
time there are changes to this file.

Once the necessary images are built, you can start the services with

```sh
$ npm run docker:dev
```

This will start three docker containers in a detached state i.e. you will be returned
to the terminal prompt when the containers successfully start and they will continue
running in the background.

To view the output from any of the containers you can run

```sh
$ docker logs -f <CONTAINER ID or NAME>
```

The ID or name of a docker container can be found by running

```sh
$ docker ps
```

### Docker Containers

The application is comprised of three independent docker containers.

#### NodeJS Server

- Image: `node:14-alpine`
- Port: 8000
- Notes
  - Automatically restarts on code changes

#### MongoDB Server

- Image: `mongo`
- Port: 27017

#### MinIO Server

- Image: `quay.io/minio/minio`
- Ports:
  - Server Port: 9000
  - Web Console Port: 9001
- Notes
  - Default Credentials (Username/Password): minioadmin/minioadmin

## Wrapping Up

Once you are done with development, the docker containers can be stopped by running

```sh
$ npm run docker:stop
```
