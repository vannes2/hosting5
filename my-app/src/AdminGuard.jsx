import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/LoginAdmin"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return children;
};

export default AdminGuard;
