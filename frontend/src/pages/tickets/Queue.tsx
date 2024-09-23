import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Ticket } from "../../interfaces/Ticket";
import { variables } from "../../config/vars";

export const Queue: React.FC = () => {
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState<Ticket[]>();

  useEffect(() => {
    socket.on("assigned-tickets", (assignedTickets) => {
      setTickets(assignedTickets);
    });

    return () => {
      socket.off("assigned-tickets");
    };
  }, [socket]);


  useEffect(() => {
    fetch(`${variables.VITE_SOCKET_URL}/last`)
      .then((res) => res.json())
      .then((data) => setTickets(data.last));
  }
  , []);


  return (
    <div className="container mt-5">
      <div className="row">
        {/* Columna Izquierda: Tickets recientes */}
        <div className="col-md-6">
          <h2 className="mb-4 text-center">Tickets Recientes</h2>
          {tickets && tickets.slice(0,3).map((ticket) => (
            <div className="card mb-3 shadow-sm" key={ticket.id}>
              <div className="card-body">
                <h3 className="card-title">Ticket #{ticket.number}</h3>
                <p className="card-text">
                  <strong>Escritorio:</strong> {ticket.desktop}
                </p>
                <p className="card-text">
                  <strong>Agente:</strong> {ticket.agent}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Columna Derecha: Historial */}
        <div className="col-md-6">
          <h2 className="mb-4 text-center">Historial de Tickets</h2>
          <ul className="list-group">
            {tickets && tickets!.map((ticket) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={ticket.id}
              >
                <div>
                  <strong>Ticket #{ticket.number}</strong> - Escritorio{" "}
                  {ticket.desktop}
                </div>
                <span className="badge bg-primary rounded-pill">
                  {ticket.agent}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
