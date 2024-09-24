import React from "react";
import { Routes, Route } from "react-router-dom";
import BandPage from "../pages/BandPage";
import { Desktop } from "../pages/tickets/Desktop";
import { MakeTicket } from "../pages/tickets/MakeTicket";
import { Queue } from "../pages/tickets/Queue";
import { InTickets } from "../pages/tickets/InTickets";
import { Maps } from "../pages/maps/Maps";
import { Register } from "../pages/chats/Register";
import { Login } from "../pages/chats/Login";
import { ChatHome } from "../pages/chats/ChatHome";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Navbar } from "../componets/shared/Navbar";

const AppRouter: React.FC = () => {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Route for BandPage */}
        <Route path="/" element={<BandPage />} />
        <Route path="/bandpage" element={<BandPage />} />

        {/* Routes for TicketsApp */}
        <Route path="ticketsapp">
          <Route path="desktop" element={<Desktop />} />
          <Route path="crear" element={<MakeTicket />} />
          <Route path="queue" element={<Queue />} />
          <Route path="ingresar" element={<InTickets />} />
        </Route>

        {/* Routes for Maps */}
        <Route path="maps">
          <Route path="home" element={<Maps />} />
        </Route>

        {/* Routes for Chat */}
        <Route path="chat">
          <Route
            path="home"
            element={
              <PrivateRoute>
                <ChatHome />
              </PrivateRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
