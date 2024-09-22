import React, { useContext } from "react";
import { BandList } from "./componets/BandList";
import { BandAdd } from "./componets/BandAdd";
import { SocketContext } from "./context/SocketContext";
import { BandChart } from "./componets/BandChart";

const App: React.FC = () => {
  const { online } = useContext(SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success"> Online</span>
          ) : (
            <span className="text-danger"> Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <section className="row">
        <div className="col">
          <BandChart />
        </div>
      </section>
      <div className="row">
        <div className="col-8">
          <BandList />
        </div>

        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
};

export default App;
