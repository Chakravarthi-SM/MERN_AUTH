import { getData } from "@/context/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = getData();

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
