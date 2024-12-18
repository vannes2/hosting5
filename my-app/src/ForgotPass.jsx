import React from "react";
import { Link } from "react-router-dom";
import Header from "./components/HeaderBeforeLogin";
import Footer from "./components/Footer";
import "./file_css/forgotpass.css";

const ForgotPass = () => {
  return (
    <div className="forgot-password-page">
      {/* header */}
      <Header />

      <section>
        <div className="forgot-title">
          <h1>Lupa Kata Sandi Anda?</h1>
        </div>
        <div className="container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Masukkan email Anda"
          />
        </div>
        <br />
        <Link to="/resetpass" className="btn">
          Kirim
        </Link>
      </section>

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ForgotPass;
