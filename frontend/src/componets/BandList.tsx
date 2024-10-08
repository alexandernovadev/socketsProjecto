import { useEffect, useState, ChangeEvent, useContext } from "react";

import { Band } from "../interfaces/Band";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket?.on("current-bands", (bands: Band[]) => {
      setBands(bands);
    });

    return () => {
      socket?.off("current-bands");
    };
  }, [socket]);

  const votar = (id: string): void => {
    socket?.emit("votar-banda", id);
  };

  const borrar = (id: string): void => {
    socket?.emit("borrar-banda", id);
  };

  const cambiarNombre = (id: string, nombre: string): void => {
    socket?.emit("cambiar-nombre-banda", { id, nombre });
  };

  const cambioNombre = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const nuevoNombre = event.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const onPerdioFoco = (id: string, nombre: string) => {
    console.log(id, nombre);
    cambiarNombre(id, nombre);
  };

  const crearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            onChange={(event) => cambioNombre(event, band.id)}
            onBlur={() => onPerdioFoco(band.id, band.name)}
          />
        </td>
        <td>
          {" "}
          <h3> {band.votes} </h3>{" "}
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => borrar(band.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <table className="table table-stripped">
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Votos</th>
          <th>Borrar</th>
        </tr>
      </thead>
      <tbody>{crearRows()}</tbody>
    </table>
  );
};
