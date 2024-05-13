import { Navigate } from "react-router-dom";
import { User } from "../pages/registration/Login";

function ProtectedRouteForAdmin({ children }: { children: any }) {
  const userString = localStorage.getItem("user");
  const user: User | null = userString ? JSON.parse(userString) : null;
  if (user?.role === "admin") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRouteForAdmin;
