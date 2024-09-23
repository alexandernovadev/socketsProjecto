import { Server as SocketIOServer, Socket } from "socket.io";
import { BandList } from "./band-list";
import { BandNamePayload } from "../interfaces/BandNamePayload";
import { TicketList } from "./ticket-list";
import { MarkerData } from "../interfaces/Maps";

export class SocketsService {
  private io: SocketIOServer;
  private bandList: BandList;
  public ticketList: TicketList;
  private markers: MarkerData[] = [];

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
        this.io.emit("assigned-tickets", this.ticketList.last13);
      });

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

      // MAPS APP 

      // Emitir los marcadores actuales al nuevo cliente conectado
      socket.emit("current-markers", this.markers);

      // Escuchar cuando un cliente agrega un nuevo marcador
      socket.on("add-marker", (newMarker: MarkerData) => {
        this.markers.push(newMarker);
        // Emitir el nuevo marcador a todos los clientes
        this.io.emit("new-marker", newMarker);
      });

      // Escuchar cuando un cliente mueve un marcador existente
      socket.on("move-marker", (updatedMarker: MarkerData) => {
        // Actualizar la posición del marcador en la lista
        this.markers = this.markers.map((marker) =>
          marker.id === updatedMarker.id ? updatedMarker : marker
        );
        // Emitir el marcador actualizado a todos los clientes
        this.io.emit("updated-marker", updatedMarker);
      });
    });
  }
}
