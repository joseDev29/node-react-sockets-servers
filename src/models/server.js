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

    //sockets initialization
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
    this.app.get("/last-tickets", (req, res) => {
      return res.json({
        tickets: this.sockets.ticketList.last13,
      });
    });
  }

  execute() {
    //middlewares initialization
    this.middlewares();

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
