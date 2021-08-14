const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;

    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    //on connection
    this.io.on("connection", (socket) => {
      console.log("client connected, socket ID : ", socket.id);

      socket.on("create-ticket", (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      socket.on("next-ticket-work", ({ agent, desk }, callback) => {
        const yourTicket = this.ticketList.assignTicket(agent, desk);
        callback(yourTicket);

        this.io.emit("asigned-ticket", this.ticketList.last13);
      });
    });
  }
}

module.exports = Sockets;
