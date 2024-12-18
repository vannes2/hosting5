import React from 'react';
import { Link } from 'react-router-dom';
import Header from "./components/HeaderBeforeLogin";
import Footer from "./components/Footer";
import './file_css/HomeBeforeLogin.css';

const HomeBeforeLogin = () => {
  return (
    <div className="home-before-page">
      {/* header */}
      <Header />

      <section className="hero">
        <div className="hero-text">
          <h1>Raih tujuan kulit Anda bersama kami</h1>
          <p>Segera daftarkan diri Anda dan ketahui masalah kulit Anda bersama dokter kecantikan terpercaya dari Kami</p>
          <div className="buttons">
            <Link to="/Login"><button>Masuk</button></Link>
            <Link to="/signup"><button>Daftar</button></Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="assets/images/ilustrasiheader.png" alt="Ilustrasi Header" />
        </div>
      </section>

      <section className="products">
        <div className="product-section">
          <h2 className="product-title">Produk Skincare yang Sedang Tren</h2>
          <div className="auth-buttons">
            <Link to="/produk" className="btn-right"><button>Selengkapnya &gt;</button></Link>
          </div>
        </div>
        <div className="product-list">
          <div className="product-item">
            <img src="assets/images/gambarheader1.png" alt="SKINTIFIC Peeling" />
            <p><strong>SKINTIFIC</strong><br />Peeling Lactic Acid Skin Renewal Exfoliating Serum<br />Rp300.000 - Rp340.000</p>
          </div>
          <div className="product-item">
            <img src="assets/images/gambarheader2.png" alt="SKINTIFIC Peeling" />
            <p><strong>SKINTIFIC</strong><br />Peeling Lactic Acid Skin Renewal Exfoliating Serum<br />Rp300.000 - Rp340.000</p>
          </div>
          <div className="product-item">
            <img src="assets/images/gambarheader3.png" alt="AMATERASUN Physical Sunscreen SPF 50+" />
            <p><strong>AMATERASUN</strong><br />Physical Sunscreen SPF 50+ PA++<br />Rp85.000 - Rp99.000</p>
          </div>
          <div className="product-item">
            <img src="assets/images/gambarheader4.png" alt="SOMETHINC Diamond Phyto Stem Cell Serum" />
            <p><strong>SOMETHINC</strong><br />Diamond Phyto Stem Cell Serum<br />Rp130.000 - Rp140.000</p>
          </div>
          <div className="product-item">
            <img src="assets/images/gambarheader5.png" alt="BIO-OIL Skincare Oil Natural" />
            <p><strong>BIO-OIL</strong><br />Skincare Oil Natural<br />Rp260.000 - Rp325.000</p>
          </div>
        </div>
      </section>

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeBeforeLogin;
