import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Ticket } from "../../interfaces/Ticket";
import { getUsuarioStorage } from "../../helpers/getUsuarioStorage";
import { useNavigate } from "react-router-dom";

export const Desktop = () => {
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState<Ticket>();
  const [usuario] = useState(getUsuarioStorage());
  const navigate = useNavigate();

  const [noTicket, setNoTicket] = useState(false);

  const nextTicket = () => {
    socket.emit(
      "assign-ticket",
      { agent: usuario.agente, desktop: usuario.escritorio },
      (ticket: Ticket) => {
        console.log("Ticket", ticket);

        if (ticket == null) {
          setNoTicket(true);
          return;
        }
        setTicket(ticket);
      }
    );
  };

  const salir = () => {
    localStorage.clear();
    navigate("/ticketsapp/ingresar");
  };

  useEffect(() => {
    // redirect if there is no agent or desktop
    if (!usuario.agente || !usuario.escritorio) {
      navigate("/ticketsapp/ingresar");
    }
  }, [usuario, navigate]);

  return (
    <div className="container mt-5 col-5">
      <div className="row">
        <section className="col-10">
          <h1 className="mb-5">Desktop</h1>
        </section>
        <section className="col-2">
          <button className="btn btn-danger mt-2" onClick={salir}>
            Salir
          </button>
        </section>
      </div>
      <div className="row">
        <div className="col">
          <div className="mt-1">
            <div className="alert alert-info">
              <strong>Agente:</strong> {usuario.agente}
            </div>
            <div className="alert alert-success">
              <strong>Escritorio: </strong> {usuario.escritorio}
            </div>

            {noTicket && (
              <div className="alert alert-danger">No hay tickets</div>
            )}

            {!noTicket && ticket && (
              <div className="alert alert-warning">
                <h4>Estas trabando en el ticket : {ticket.number} </h4>
              </div>
            )}
          </div>
          <button className="btn btn-primary mt-2" onClick={nextTicket}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
