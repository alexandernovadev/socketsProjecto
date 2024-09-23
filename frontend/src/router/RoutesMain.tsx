import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BandPage from "../pages/BandPage";
import { Desktop } from "../pages/tickets/Desktop";
import { MakeTicket } from "../pages/tickets/MakeTicket";
import { Queue } from "../pages/tickets/Queue";
import { InTickets } from "../pages/tickets/InTickets";
import { Maps } from "../pages/maps/Maps";

const AppRouter: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Sockets IO App |
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  BandPage
                </a>
              </li>

              {/* Dropdown para TicketsApp */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="ticketsDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Tickets
                </a>
                <ul className="dropdown-menu" aria-labelledby="ticketsDropdown">
                  <li>
                    <Link className="dropdown-item" to="/ticketsapp/desktop">
                      Desktop
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ticketsapp/crear">
                      Make Tickets
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ticketsapp/queue">
                      Queue
                    </Link>
                  </li>{" "}
                  <li>
                    <Link className="dropdown-item" to="/ticketsapp/ingresar">
                      Ingrensar
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Dropdown para Chat */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="chatDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Chat
                </a>
                <ul className="dropdown-menu" aria-labelledby="chatDropdown">
                  <li>
                    <Link className="dropdown-item" to="/chat/home">
                      Chat Home
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/chat/myprofile">
                      My Profile
                    </Link>
                  </li>
                </ul>
              </li>     
              
               {/* Dropdown para Mapsa */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="chatDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mapas
                </a>
                <ul className="dropdown-menu" aria-labelledby="chatDropdown">
                  <li>
                    <Link className="dropdown-item" to="/maps/home">
                      Mapas Home
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/chat/myprofile">
                      My Profile
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        {/* Ruta para BandPage */}
        <Route path="/" element={<BandPage />} />
        <Route path="/bandpage" element={<BandPage />} />

        {/* Rutas para TicketsApp */}
        <Route path="ticketsapp">
          <Route path="desktop" element={<Desktop />} />
          <Route path="crear" element={<MakeTicket />} />
          <Route path="queue" element={<Queue />} />
          <Route path="ingresar" element={<InTickets />} />
        </Route>

        {/* Rutas para Chat */}
        <Route path="chat">
          <Route path="home" element={<>Chat Home</>} />
          <Route path="myprofile" element={<>My Profile</>} />
        </Route>
        {/* Rutas para Mpas */}
        <Route path="maps">
          <Route path="home" element={<Maps />} />
          <Route path="myprofile" element={<>My Profile</>} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
