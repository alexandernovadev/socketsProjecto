// src/components/shared/Loading.tsx
import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="mt-3">Cargando, por favor espera...</h5>
      </div>
    </div>
  );
};
