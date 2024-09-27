import React, { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { variables } from "../config/vars";
import { Socket } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./chat/ChatContext";
import { types } from "../types/types";

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

  const { dispatch } = useContext(ChatContext);

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

  // Escuchar los cambios en los usuarios conectados
  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      dispatch({
        type: types.usuariosCargados,
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
