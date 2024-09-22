import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import { Chart, registerables } from "chart.js";
import { Band } from "../interfaces/Band";

export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const chartInstanceRef = useRef<Chart | null>(null); 
  // Usamos useRef para almacenar la instancia del gráfico

  useEffect(() => {
    // Registra todos los componentes de Chart.js
    Chart.register(...registerables);

    socket.on("current-bands", (bands) => {
      crearGrafica(bands);
    });

    // Limpiar el evento del socket al desmontar el componente
    return () => {
      socket.off("current-bands");
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destruye la instancia del gráfico cuando el componente se desmonta
      }
    };
  }, [socket]);

  const crearGrafica = (bands: Band[]) => {
    const canvas = document.getElementById(
      "myChart"
    ) as HTMLCanvasElement | null;

    if (!canvas) {
      return;
    }

    // Destruye el gráfico anterior si ya existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Crear un nuevo gráfico y almacenarlo en chartInstanceRef
    chartInstanceRef.current = new Chart(canvas, {
      type: "bar", // Cambia de 'horizontalBar' a 'bar' con 'indexAxis'
      data: {
        labels: bands.map((band: Band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map((band: Band) => band.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y", // Esto convierte el gráfico de barras en horizontal
        animation: false,
        scales: {
          x: {
            stacked: true,
          },
        },
      },
    });
  };

  return <canvas id="myChart" width={600} height={200}></canvas>;
};
