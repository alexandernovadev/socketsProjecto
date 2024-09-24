import React from "react";

export const MessageInput: React.FC = () => {
  return (
    <div className="d-flex p-3 bg-dark border-top border-secondary">
      <input
        type="text"
        className="form-control me-2 bg-dark text-white"
        placeholder="Mensaje..."
      />
      <button className="btn btn-primary">Enviar</button>
    </div>
  );
};
