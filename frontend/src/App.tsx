import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BandList } from "./componets/BandList";
import { BandAdd } from "./componets/BandAdd";

// Tipos para las bandas
interface Band {
  id: string;
  name: string;
  votes: number;
}

const connectSocketServer = (): Socket => {
  const socket = io("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

const App: React.FC = () => {
  const [socket] = useState<Socket>(connectSocketServer());
  const [online, setOnline] = useState<boolean>(false);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });

    socket.on("disconnect", () => {
      setOnline(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("current-bands", (bands: Band[]) => {
      setBands(bands);
    });

    return () => {
      socket.off("current-bands");
    };
  }, [socket]);

  const votar = (id: string): void => {
    socket.emit("votar-banda", id);
  };

  const borrar = (id: string): void => {
    socket.emit("borrar-banda", id);
  };

  const cambiarNombre = (id: string, nombre: string): void => {
    socket.emit("cambiar-nombre-banda", { id, nombre });
  };

  const crearBanda = (nombre: string): void => {
    socket.emit("crear-banda", { nombre });
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            votar={votar}
            borrar={borrar}
            cambiarNombre={cambiarNombre}
          />
        </div>

        <div className="col-4">
          <BandAdd crearBanda={crearBanda} />
        </div>
      </div>
    </div>
  );
};

export default App;
