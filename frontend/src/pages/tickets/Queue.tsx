import React from "react";

const data = [
  {
    ticketNo: 33,
    escritorio: 3,
    agente: "Fernando Herrera",
  },
  {
    ticketNo: 34,
    escritorio: 4,
    agente: "Melissa Flores",
  },
  {
    ticketNo: 35,
    escritorio: 5,
    agente: "Carlos Castro",
  },
  {
    ticketNo: 36,
    escritorio: 3,
    agente: "Fernando Herrera",
  },
  {
    ticketNo: 37,
    escritorio: 3,
    agente: "Fernando Herrera",
  },
  {
    ticketNo: 38,
    escritorio: 2,
    agente: "Melissa Flores",
  },
  {
    ticketNo: 39,
    escritorio: 5,
    agente: "Carlos Castro",
  },
];

export const Queue: React.FC = () => {
  const recentTickets = data.slice(0, 3); // Los 3 tickets más recientes
  const historyTickets = data.slice(3); // El resto de los tickets (historial)

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Columna Izquierda: Tickets recientes */}
        <div className="col-md-6">
          <h2 className="mb-4 text-center">Tickets Recientes</h2>
          {recentTickets.map((ticket) => (
            <div className="card mb-3 shadow-sm" key={ticket.ticketNo}>
              <div className="card-body">
                <h3 className="card-title">Ticket #{ticket.ticketNo}</h3>
                <p className="card-text">
                  <strong>Escritorio:</strong> {ticket.escritorio}
                </p>
                <p className="card-text">
                  <strong>Agente:</strong> {ticket.agente}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Columna Derecha: Historial */}
        <div className="col-md-6">
          <h2 className="mb-4 text-center">Historial de Tickets</h2>
          <ul className="list-group">
            {historyTickets.map((ticket) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={ticket.ticketNo}
              >
                <div>
                  <strong>Ticket #{ticket.ticketNo}</strong> - Escritorio{" "}
                  {ticket.escritorio}
                </div>
                <span className="badge bg-primary rounded-pill">
                  {ticket.agente}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
