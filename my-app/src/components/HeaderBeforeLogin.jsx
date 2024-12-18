import React from "react";
import { Link } from "react-router-dom";
import logo from "/assets/images/logobesar.svg";
import "./Header.css"; // File CSS untuk Header

const HeaderBeforeLogin = () => {
  return (
    <header>
        <div className="logo">
        <img src={logo} alt="Logo Ayune" />
        </div>
        <nav>
          <ul>
            <li><Link to="/">BERANDA</Link></li>
            <li><Link to="/AboutUs">TENTANG KAMI</Link></li>
            <li><Link to="/#">PRODUK</Link></li>
            <li><Link to="/#">KONSULTASI</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/Login"><button>Masuk</button></Link>
        </div>
      </header>
  );
};

export default HeaderBeforeLogin;