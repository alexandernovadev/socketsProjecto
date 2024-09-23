// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.tsx";
import AppRouter from "./router/RoutesMain.tsx";
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <SocketProvider>
    <Router>
      <AppRouter /> 
    </Router>
  </SocketProvider>
  // </StrictMode>
);
