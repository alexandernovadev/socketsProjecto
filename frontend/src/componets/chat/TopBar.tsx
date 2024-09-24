import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const TopBar: React.FC = () => {
  const { auth,logout } = useContext(AuthContext);
  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white border-bottom border-secondary">
      <span className="text-primary">{auth.name} </span>
      <span className="btn btn-danger " onClick={logout}>
        Salir
      </span>
    </div>
  );
};
