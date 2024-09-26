// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.tsx";
import AppRouter from "./router/RoutesMain.tsx";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <SocketProvider>
      <Router>
        <AppRouter />
      </Router>
    </SocketProvider>
  </AuthProvider>
  // </StrictMode>
);
