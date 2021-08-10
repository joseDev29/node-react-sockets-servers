class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    //on connection
    this.io.on("connection", (socket) => {
      console.log("client connected, socket ID : ", socket.id);

      //emite solo al cliente conectado a ese socket
      socket.emit("welcome-message", {
        message: "Hello user, welcome to basic socket server",
        date: new Date(),
      });

      socket.on("message-to-server", (data) => {
        console.log("send message");

        //emite a todos los clientes conectados
        this.io.emit("message-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
