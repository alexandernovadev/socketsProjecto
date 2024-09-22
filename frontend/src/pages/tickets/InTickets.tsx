import { useNavigate } from "react-router-dom";

export const InTickets = () => {

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Enviando...");
    navigate("/ticketsapp/desktop");
  };

  return (
    <>
      <form className="container mt-5 col-5" onSubmit={handleSubmit}>
        <h1 className="mb-5">Ingresar</h1>
        <h3>Ingrese su nombre y número de escritorio</h3>
        <div className="mb-3">
          <label className="form-label">Nombre Agente</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Desktop</label>
          <input type="number" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
      </form>
    </>
  );
};
