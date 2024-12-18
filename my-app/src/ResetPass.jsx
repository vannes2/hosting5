import React from 'react';
import { Link } from 'react-router-dom';
import Header from "./components/HeaderBeforeLogin";
import Footer from "./components/Footer";
import './file_css/forgotpass.css';

const ResetPass = () => {
  return (
    <div className="forgot-password-page">
      {/* header */}
      <Header />

      <section>
        <div className="forgot-title">
          <h1>Reset Kata Sandi Anda?</h1>
        </div>

        <div className="container">
          <label htmlFor="password">Kata Sandi Baru</label>
          <input type="password" id="password" name="password" placeholder="Masukkan kata sandi baru Anda" />
        </div>
        <br />
        <Link to="/Login" className="btn">Ganti Kata Sandi</Link>
      </section>

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ResetPass;
