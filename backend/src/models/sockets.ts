import { Server as SocketIOServer, Socket } from "socket.io";
import { BandList } from "./band-list";
import { BandNamePayload } from "../interfaces/BandNamePayload";

export class SocketsService {
  private io: SocketIOServer;
  private bandList: BandList;

  constructor(io: SocketIOServer) {
    this.io = io;
    this.bandList = new BandList();

    this.socketEvents();
  }

  private socketEvents(): void {
    // On connection
    this.io.on("connection", (socket: Socket) => {
      console.log("Cliente conectado");

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
