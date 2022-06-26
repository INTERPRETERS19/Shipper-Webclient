import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgottenPassword from "../views/Forgotten/ForgottenPassword";
import GetStarted from "../views/GetStarted/GetStarted";
import Home from "../views/Home/Home";
import Login from "../views/LogIn/LogIn";
import Pickups from "../views/Pickups/PickupRequest/PickUpRequest";
import ChangePassword from "../views/ChangePassword/ChangePassword";
import SignUp from "../views/SignUp/SignUp";
import ResetPassword from "../views/ResetPassword/ResetPassword";
import AllReturns from "../views/Returns/AllReturns/AllReturns";
import NewShipments from "../views/Shipments/NewShipments/NewShipments";
import RSummary from "../views/Returns/Summary/Summary";
import NotFound from "../NotFound/NotFound";
import BankDetails from "../views/BankDetails/BankDetails";
import ProtectedRoutes from "../routes/ProtectedRoutes";
import AddShipments from "../views/Shipments/AddShipments/AddShipments";
import Reports from "../views/Shipments/Reports/Reports";
import Report from "../views/Returns/Reports/Reports";
import Profile from "../views/Profile/Profile";
import UpdateProfile from "../views/Profile/UpdateProfile";
import EmailVerification from "../views/SignUp/emailVerification";
import Track from "../views/Shipments/Track/Track";
import AllShipments from "../views/Shipments/AllShipments/AllShipment";
import DeliveredShip from "../views/Shipments/DeliveredShipments/DeliveredShipments";

const MainRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/emailVerification" element={<EmailVerification />} />
        <Route path="/fp" element={<ForgottenPassword />} />
        <Route path="/passwordReset" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/passwordChange" element={<ChangePassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="shipments/newshipments" element={<NewShipments />} />
          <Route path="shipments/reports" element={<Reports />} />
          <Route path="returns/reports" element={<Report />} />
          <Route path="/pickups/pickuprequests" element={<Pickups />} />
          <Route path="/returns/allreturns" element={<AllReturns />} />

          <Route path="/bankdetails" element={<BankDetails />} />
          <Route path="/profile/profile" element={<Profile />} />
          <Route path="/profile/updateprofile" element={<UpdateProfile />} />
          <Route path="/shipment/addshipments" element={<AddShipments />} />
          <Route path="/shipments/track" element={<Track />} />
          <Route path="/shipment/allshipments" element={<AllShipments />} />
          <Route path="/returns/summary" element={<RSummary />} />
          <Route path="/shipments/track" element={<Track />} />
          <Route
            path="/shipment/deliveredshipments"
            element={<DeliveredShip />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
export default MainRoute;
