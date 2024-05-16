import { Navigate } from "react-router-dom";
import { User } from "../pages/registration/Login";

function ProtectedRouteWithSession({ children }: { children: any }) {
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;
  console.log(user);
  if (user && new Date().getTime() < user.expiration) {
    return children;
  } else {
    sessionStorage.removeItem("userSession");
    localStorage.removeItem("initialState");

    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRouteWithSession;
