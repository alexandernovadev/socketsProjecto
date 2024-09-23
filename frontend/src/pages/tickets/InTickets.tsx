import { useNavigate } from "react-router-dom";
import { getUsuarioStorage } from "../../helpers/getUsuarioStorage";
import { useEffect, useState } from "react";

export const InTickets = () => {
  const [usuario] = useState(getUsuarioStorage());
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem("agente", e.currentTarget.agent.value);
    localStorage.setItem("escritorio", e.currentTarget.desktop.value);

    navigate("/ticketsapp/desktop");
  };

  useEffect(() => {
    if (usuario.agente && usuario.escritorio) {
      navigate("/ticketsapp/desktop");
    }
  }, [usuario, navigate]);

  return (
    <>
      <form className="container mt-5 col-5" onSubmit={handleSubmit}>
        <h1 className="mb-5">Ingresar</h1>
        <h3>Ingrese su nombre y número de escritorio</h3>
        <div className="mb-3">
          <label className="form-label">Nombre Agente</label>
          <input type="text" name="agent" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Desktop</label>
          <input
            type="number"
            name="desktop"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
      </form>
    </>
  );
};
