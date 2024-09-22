import React, { useEffect, useState, ChangeEvent } from "react";

// Interfaz para la banda
interface Band {
  id: string;
  name: string;
  votes: number;
}

// Props del componente
interface BandListProps {
  data: Band[];
  votar: (id: string) => void;
  borrar: (id: string) => void;
  cambiarNombre: (id: string, nombre: string) => void;
}

export const BandList: React.FC<BandListProps> = ({
  data,
  votar,
  borrar,
  cambiarNombre,
}) => {
  const [bands, setBands] = useState<Band[]>(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

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
