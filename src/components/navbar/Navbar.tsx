import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">Shoppee</div>

      <div className="navbar-menu">
        {/* Home */}
        <span>
          <Link to={"/"}>Home</Link>
        </span>
        {/* All Product */}
        <span>
          <Link to={"/allproduct"}>All Product</Link>
        </span>
        {/* Signup */}
        <span>
          <Link to={"/signup"}>Signup</Link>
        </span>
        {/* User */}
        <span>
          <Link to={"/"}>Kamal</Link>
        </span>
        {/* Admin */}
        {/* <span>
            </span> */}
        {/* logout */}
        {/* <span>
            </span> */}
        {/* Cart */}
        <span>
          <Link to={"/cart"}></Link>
        </span>
      </div>
      <div className="navbar-search">
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;
