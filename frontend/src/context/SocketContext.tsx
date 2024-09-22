import React, { createContext } from "react";
import { useSocket } from "../hooks/useSocket";
import { variables } from "../config/vars";
import { Socket } from "socket.io-client";

// Definir la interfaz del contexto
interface SocketContextProps {
  socket: Socket;
  online: boolean;
}

export const SocketContext = createContext({} as SocketContextProps);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, online } = useSocket(variables.VITE_SOCKET_URL);
  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
