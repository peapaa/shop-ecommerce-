import SearchBar from "../searchBar/SearchBar";
import styles from "../../App.module.scss";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../pages/registration/Login";
const Navbar = () => {
  const userString = sessionStorage.getItem("userSession");
  const user: User | null = userString ? JSON.parse(userString) : null;

  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("userSession");
    localStorage.removeItem("initialState");
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
          Shoppee
        </Link>
      </div>

      <ul className={styles.navbarMenu}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>

        <li>
          <Link to={"/allproduct"}>All Product</Link>
        </li>

        {!user ? (
          <li>
            <Link to={"/signup"}>Signup</Link>
          </li>
        ) : (
          ""
        )}

        {!user ? (
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        ) : (
          ""
        )}

        {user && user?.role === "user" && (
          <li>
            <Link to={"/user-dashboard"}>{user?.name}</Link>
          </li>
        )}
        {user?.role === "admin" && (
          <li>
            <Link to={"/admin-dashboard"}>{user?.name}</Link>
          </li>
        )}

        {user && (
          <li>
            <a href="/login" onClick={logout}>
              Logout
            </a>
          </li>
        )}

        {user && user?.role === "user" && (
          <li>
            <Link to={"/cart"}>Cart(0)</Link>
          </li>
        )}
      </ul>
      <div className={styles.navbarSearch}>
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;
