const MarkerList = require("./marker-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.markers = new MarkerList();

    this.socketEvents();
  }

  socketEvents() {
    //on connection
    this.io.on("connection", (socket) => {
      console.log("client connected, socket ID : ", socket.id);

      socket.emit("active-markers", this.markers.actives);

      socket.on("create-marker", (marker) => {
        this.markers.addMarker(marker);
        //broadcast emite a todos los clientes menos al emisor
        socket.broadcast.emit("create-marker", marker);
      });

      socket.on("updated-marker", (marker) => {
        this.markers.updateMarker(marker);

        socket.broadcast.emit("updated-marker", marker);
      });
    });
  }
}

module.exports = Sockets;
