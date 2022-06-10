import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import SideBar from "../components/Sidebar";
import ForgottenPassword from "../views/Forgotten/ForgottenPassword";
import GetStarted from "../views/GetStarted/GetStarted";
import Home from "../views/Home/Home";
import AllShipments from "../views/Shipments/AllShipments/AllShipment";
import Shipments from "../views/Shipments/Shipments";

const MainRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fp" element={<ForgottenPassword />} />
        <Route path="/shipments" element={<Shipments />} />

        <Route path="/shipments/allshipments" element={<AllShipments />} />
      </Routes>
    </Router>
  );
};
export default MainRoute;
