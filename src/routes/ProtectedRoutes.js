import { Outlet } from "react-router-dom";
import { useLogin } from "../context/LoginProvider/LoginProvider";
import Login from "../views/LogIn/LogIn";

const ProtectedRoutes = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { isLoggedIn } = useLogin();
  // return isLoggedIn ? <Outlet /> : <Login />;
  return currentUser !== undefined ? <Outlet /> : <Login />;
};
export default ProtectedRoutes;
