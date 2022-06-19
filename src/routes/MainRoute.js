import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgottenPassword from "../views/Forgotten/ForgottenPassword";
import GetStarted from "../views/GetStarted/GetStarted";
import Home from "../views/Home/Home";
import Login from "../views/LogIn/LogIn";
import PendingReturns from "../views/Returns/PendingReturns/PendingReturns";
import AllShipments from "../views/Shipments/AllShipments/AllShipment";
import ChangePassword from "../views/ChangePassword/ChangePassword";
import SignUp from "../views/SignUp/SignUp";
import ResetPassword from "../views/ResetPassword/ResetPassword";
//import AllReturns from "../views/Returns/AllReturns/AllReturns";
//import NewShipments from "../views/Shipments/NewShipments/NewShipments";
//import Summary from "../views/Returns/Summary/Summary";
import NotFound from "../NotFound/NotFound";
import ProtectedRoutes from "../routes/ProtectedRoutes";

const MainRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/fp" element={<ForgottenPassword />} />
        <Route path="/passwordReset" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/shipments/allshipments" element={<AllShipments />} />
          <Route path="/returns/pendingreturns" element={<PendingReturns />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default MainRoute;
