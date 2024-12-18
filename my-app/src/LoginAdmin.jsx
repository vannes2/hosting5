import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./components/HeaderBeforeLogin";
import Footer from "./components/Footer";
import "./file_css/LoginAdmin.css";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({ email, password }); // Log data yang dikirim untuk memastikan formatnya benar.

    // Hardcode email dan password admin
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      // Jika login berhasil
      localStorage.setItem("token", "admin-token"); // Simpan token admin
      navigate("/Dashboard"); // Redirect to admin page
    } else {
      // Jika login gagal
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="LoginAdmin-page">
      {/* header */}
      <Header />

      <div className="container">
        <div className="main">
          <div className="login">
            <h2>ADMIN</h2>
            <form onSubmit={handleLogin}>
              <p>E-mail</p>
              <input
                type="email"
                placeholder="Input your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p>Kata sandi</p>
              <input
                type="password"
                placeholder="Input your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <button type="submit" className="btn">
                MASUK
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginAdmin;
