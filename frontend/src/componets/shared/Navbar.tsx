import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav
      className="navbar navbar-dark"
      style={{
        backgroundColor: "#6d2cf0",
      }}
    >
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
                  <Link className="dropdown-item" to="/chat/register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/chat/login">
                    Login
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
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
