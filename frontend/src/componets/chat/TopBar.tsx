import React from "react";

export const TopBar: React.FC = () => {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white border-bottom border-secondary">
      <span className="text-primary">Recientes</span>
      <span className="btn btn-danger ">Salir</span>
    </div>
  );
};
