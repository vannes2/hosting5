import React from "react";
import { Link } from "react-router-dom";
import logo from "/assets/images/logobesar.svg";
import "./HeaderDokter.css"; // File CSS untuk Header

const HeaderDokter = () => {
  return (
    <header>
    <div className="logo">
        <img src={logo} alt="Logo Ayune" />
    </div>
        <h1 className="dokter">Hallo Dokter... Selamat Bertugas!</h1>
    </header>

  );
};

export default HeaderDokter;
