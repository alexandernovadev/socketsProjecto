import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "../App";
import BandPage from "../pages/BandPage";

const AppRouter: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Mi App
          </Link>
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
                <Link className="nav-link" to="/">
                  BandPage
                </Link>
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
                    <Link className="dropdown-item" to="/ticketsapp/home">
                      Tickets Home
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ticketsapp/crear">
                      Crear Ticket
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/ticketsapp/showlist">
                      Show List
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
          <Route path="home" element={<>Tickets App Home</>} />
          <Route path="crear" element={<>Crear Ticket</>} />
          <Route path="showlist" element={<>Show List</>} />
        </Route>

        {/* Rutas para Chat */}
        <Route path="chat">
          <Route path="home" element={<>Chat Home</>} />
          <Route path="myprofile" element={<>My Profile</>} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
