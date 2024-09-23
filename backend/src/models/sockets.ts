import { Server as SocketIOServer, Socket } from "socket.io";
import { BandList } from "./band-list";
import { BandNamePayload } from "../interfaces/BandNamePayload";
import { TicketList } from "./ticket-list";

export class SocketsService {
  private io: SocketIOServer;
  private bandList: BandList;
  private ticketList: TicketList;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.bandList = new BandList();

    this.ticketList = new TicketList();

    this.socketEvents();
  }

  private socketEvents(): void {
    // On connection
    this.io.on("connection", (socket: Socket) => {
      console.log("Cliente conectado");

      // TICKETS APP
      socket.on("request-ticket", (payload: any, callback: Function) => {
        const newTicket = this.ticketList.makeTicket();
        console.log("Generando ticket...", newTicket);
        callback(newTicket);
      });

      socket.on("assign-ticket", ({ agent, desktop }, callback: Function) => {
        const ticket = this.ticketList.assignTicket(agent, desktop);
        console.log("Asignando ticket...", ticket);
        callback(ticket);
        // this.io.emit("assigned-tickets", this.ticketList.last13);
      } );

      // BAND APP
      // Emitir al cliente conectado, todas las bandas actuales
      socket.emit("current-bands", this.bandList.getBands());

      // Votar por la banda
      socket.on("votar-banda", (id: string) => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      // Borrar banda
      socket.on("borrar-banda", (id: string) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      // Cambiar nombre de la banda
      socket.on("cambiar-nombre-banda", ({ id, nombre }: BandNamePayload) => {
        this.bandList.changeName(id, nombre);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      // Crear una nueva banda
      socket.on("crear-banda", ({ nombre }: { nombre: string }) => {
        this.bandList.addBand(nombre);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}
