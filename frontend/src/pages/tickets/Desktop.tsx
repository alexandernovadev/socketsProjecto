import React from "react";

export const Desktop = () => {
  return (
    <div className="container mt-5 col-5">
      <div className="row">
        <div className="col">
          <button className="btn btn-danger mt-2">Salir</button>
          <div className="mt-5">
            <div className="alert alert-info">
              <strong>Agente:</strong> Carlos
            </div>
            <div className="alert alert-success">
              <strong>Escritorio: </strong> 5
            </div>
            <div className="alert alert-warning">
              <strong>No. TICKET: </strong> 59
            </div>
          </div>
          <button className="btn btn-primary mt-2">Siguiente</button>
        </div>
      </div>
    </div>
  );
};
