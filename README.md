# Flood Engine
## The Nodejs Torrent Server

Flood Engine is a full torrent server powered by NodeJs. It is just the backend part so you will need to use your own frontend part. The objective is to separate the layers to increase performance and balance on application. Flood Engine use MongoDB database.

## Features

- Register or log in
- Upload a new torrent
- Download a torrent
- Communicate with Torrent client and set yourself as peer for torrents
- Get new torrents

## Tech

Flood Engine uses a number of open source projects to work properly:
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]

## Installation

Flood Engine requires [Node.js](https://nodejs.org/) v12+ to run.
Install the dependencies and devDependencies and start the server.
```sh
cd FloodEngine
npm i
node server.js
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Modules

| Module | Version |
| ------ | ------ |
| bcryptjs | 2.4.3 |
| bencode | 2.0.2 |
| body-parser | 1.19.1 |
| cors | 2.8.5 |
| crypto | 1.0.1 |
| express | 4.17.2 |
| express-fileupload | 1.2.1 |
| fs | 0.0.1-security |
| jsonwebtoken | 8.5.1 |
| mongoose | 6.1.6 |
| mongoose-sequence | 5.3.1 |
| parse-torrent | 9.1.4 |

   [node.js]: <http://nodejs.org>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>