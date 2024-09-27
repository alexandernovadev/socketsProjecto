// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.tsx";
import AppRouter from "./router/RoutesMain.tsx";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ChatProvider } from "./context/chat/ChatContext.tsx";

import "./index.css";


createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <ChatProvider>
      <SocketProvider>
        <Router>
          <AppRouter />
        </Router>
      </SocketProvider>
    </ChatProvider>
  </AuthProvider>
  // </StrictMode>
);
