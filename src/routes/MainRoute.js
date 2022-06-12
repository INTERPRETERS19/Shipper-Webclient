import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import SideBar from "../components/Sidebar";
import ForgottenPassword from "../views/Forgotten/ForgottenPassword";
import GetStarted from "../views/GetStarted/GetStarted";
import Home from "../views/Home/Home";
import Login from "../views/LogIn/LogIn";
import PendingReturns from "../views/Returns/PendingReturns/PendingReturns";
import AllShipments from "../views/Shipments/AllShipments/AllShipment";
import ChangePassword from "../views/ChangePassword/ChangePassword";
import SignUp from "../views/SignUp/SignUp";

const MainRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fp" element={<ForgottenPassword />} />
        <Route path="/changepw" element={<ChangePassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shipments/allshipments" element={<AllShipments />} />
        <Route path="/returns/pendingreturns" element={<PendingReturns />} />
      </Routes>
    </Router>
  );
};
export default MainRoute;
