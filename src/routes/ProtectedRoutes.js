import { Outlet } from "react-router-dom";
import { useLogin } from "../context/LoginProvider/LoginProvider";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useLogin();
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default ProtectedRoutes;
