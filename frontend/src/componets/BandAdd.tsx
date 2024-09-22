import React, { useState, ChangeEvent, FormEvent } from "react";

// Props para el componente BandAdd
interface BandAddProps {
  crearBanda: (nombre: string) => void;
}

export const BandAdd: React.FC<BandAddProps> = ({ crearBanda }) => {
  const [valor, setValor] = useState<string>("");

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (valor.trim().length > 0) {
      // Llamar a la función para emitir el evento
      crearBanda(valor);

      setValor(""); // Limpiar el campo después de enviar
    }
  };

  const onChangeInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setValor(ev.target.value);
  };

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={valor}
          onChange={onChangeInput}
        />
      </form>
    </>
  );
};
