import React, { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { variables } from "../config/vars";
import { Socket } from "socket.io-client";
import { AuthContext } from "./AuthContext";

// Definir la interfaz del contexto
interface SocketContextProps {
  socket: Socket | null;
  online: boolean;
}

export const SocketContext = createContext({} as SocketContextProps);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    variables.VITE_SOCKET_URL
  );

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
