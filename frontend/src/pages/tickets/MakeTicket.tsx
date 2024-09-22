import React from "react";

export const MakeTicket: React.FC = () => {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 col-md-8 col-lg-6">
        <div className="card-body text-center">
          <h2 className="card-title mb-4">Generar nuevo ticket</h2>
          <p className="card-text">Presione el botón para generar su ticket.</p>
          <button className="btn btn-primary mb-4">
            Generar
          </button>
          <div className="mt-4">
            <h3>Su número de ticket es:</h3>
            <hr />
            <h1 className="display-4 text-success">66</h1>
            <p className="mt-4 text-muted">Por favor, espere su turno</p>
          </div>
        </div>
      </div>
    </div>
  );
};
