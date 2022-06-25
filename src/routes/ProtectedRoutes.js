import { Outlet } from "react-router-dom";
import { useLogin } from "../context/LoginProvider/LoginProvider";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useLogin();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
