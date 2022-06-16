import "./App.css";
import MainRoute from "./routes/MainRoute";
import { ShipmentProvider } from "./context/ShipmentProvider/ShipmentProvider";
import LoginProvider from "./context/LoginProvider/LoginProvider";

function App() {
  return (
    <LoginProvider>
      <ShipmentProvider>
        <MainRoute />
      </ShipmentProvider>
    </LoginProvider>
  );
}

export default App;
