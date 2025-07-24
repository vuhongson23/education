import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "~/utils/auth";

const PrivateRoute = () => {
  const user = isAuthenticated();
  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
