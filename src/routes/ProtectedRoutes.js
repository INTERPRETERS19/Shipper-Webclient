import { Outlet } from "react-router-dom";
import { useLogin } from "../context/LoginProvider/LoginProvider";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  // const currentUser = JSON.parse(localStorage.getItem("user"));
  const { isLoggedIn } = useLogin();
  // return isLoggedIn ? <Outlet /> : <Login />;
  // return currentUser !== undefined ? <Outlet /> : <Login />;
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default ProtectedRoutes;
