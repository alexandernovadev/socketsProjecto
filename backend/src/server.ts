import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import dotenv from "dotenv";
import { SocketsService } from "./models/sockets";
import { connectMongoDB } from "./database/config";

// Routes
import authRoutes from "./routes/auth";
import messagesRoutes from "./routes/messages";

dotenv.config();

class Server {
  private app: Application;
  private server: HttpServer;
  private io: SocketIOServer;
  private port: string | number;
  private sockets: SocketsService;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketIOServer(this.server);
    this.port = process.env.PORT || 8080;

    // DB Connection
    connectMongoDB();

    this.initializeMiddlewares();
    this.initializeRoutes();

    this.sockets = new SocketsService(this.io);
  }

  private initializeMiddlewares(): void {
    // Aquí puedes agregar middlewares como Helmet, Morgan, etc.
    this.app.use(express.json());

    // CORS
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  }

  private initializeRoutes(): void {
    this.app.use(express.static("public"));
    this.app.use(express.json());

    // get last 13 tickets
    this.app.get("/last", (req, res) => {
      res.json({
        last: this.sockets.ticketList.last13,
      });
    });

    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/messages", messagesRoutes);
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default Server;
