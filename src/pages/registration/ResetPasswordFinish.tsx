import React from "react";
import { useNavigate } from "react-router-dom";
import "../noPage/nopage.css";

function ResetPasswordFinish() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "rgb(241 207 227)",
      }}
    >
      <p style={{ fontSize: 20 }}>Password reset susscess</p>
      <button className="goHome" onClick={() => navigate("/login")}>
        GO HOME
      </button>
    </div>
  );
}

export default ResetPasswordFinish;
