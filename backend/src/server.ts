import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import { SocketsService } from "./models/sockets";
// import { v4 as uuidv4 } from "uuid";

dotenv.config();

class Server {
  private app: Application;
  private server: HttpServer;
  private io: SocketIOServer;
  private port: string | number;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIOServer(this.server);
    this.port = process.env.PORT || 8080;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSocket();
  }

  private initializeMiddlewares(): void {
    // Aquí puedes agregar middlewares como Helmet, Morgan, etc.
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use(express.static("public"));
  }

  private initializeSocket(): void {
   new SocketsService(this.io);
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default Server;
