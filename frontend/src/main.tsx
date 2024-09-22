// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.tsx";
import AppRouter from "./router/RoutesMain.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <SocketProvider>
    <Router>
      <AppRouter /> 
    </Router>
  </SocketProvider>
  // </StrictMode>
);
