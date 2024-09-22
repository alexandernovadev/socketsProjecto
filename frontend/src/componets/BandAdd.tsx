import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const [valor, setValor] = useState<string>("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (valor.trim().length > 0) {
      // Llamar a la función para emitir el evento
      socket.emit("crear-banda", { nombre: valor });

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
