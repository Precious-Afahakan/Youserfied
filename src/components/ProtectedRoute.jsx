import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../Authentication/useAuth";

const ProtectedRoute = () => {
  const { validateToken } = useAuth();
  const isValid = validateToken();

  return isValid ? <Outlet /> : <Navigate to={"/login"} />;
};
export { ProtectedRoute };
