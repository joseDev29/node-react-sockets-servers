const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");
const config = require("../config");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = config.server.port;

    //http server
    this.server = http.createServer(this.app);

    //sockets config
    this.io = socketIO(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    //middlewares initialization
    this.middlewares();

    //sockets configuration
    this.configSockets();

    this.server.listen(this.port, () => {
      if (config.server.env === "development")
        console.log(
          `-----> Server running in port http://localhost:${this.port} <-----`
        );
      else console.log(`-----> Server running <-----`);
    });
  }
}

module.exports = Server;
