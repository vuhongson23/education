import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "~/utils/auth";

const PublicRoute = () => {
  const user = isAuthenticated();
  return user ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default PublicRoute;
