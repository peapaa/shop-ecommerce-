import { Navigate } from "react-router-dom";
import { User } from "../pages/registration/Login";

function ProtectedRouteForUser({ children }: { children: any }) {
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;
  if (user?.role === "user") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRouteForUser;
