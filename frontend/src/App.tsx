import React from "react";
import { BandList } from "./componets/BandList";
import { BandAdd } from "./componets/BandAdd";
import { variables } from "./config/vars";
import { useSocket } from "./hooks/useSocket";

const App: React.FC = () => {
  const { online } = useSocket(variables.VITE_SOCKET_URL);

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
