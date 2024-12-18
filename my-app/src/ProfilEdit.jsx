import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import './file_css/profil.css';

const ProfilEdit = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="profile-page">
      {/* header */}
      <Header />

      {/* content */}
      <div className="header-divider">
        <span className="header-divider-text">Profil</span>
      </div>
      <div className="luar">

      {/* profil kulit */}
      <div className="profile-container">
        <div className="profile-sidebar">
        <div className="profile-coin-container">
                <div className="profile-picture">
                    <img src="assets/images/emptyprofile.png" alt="Edit Profile"/>
                    <Link to="/profil_edit"><p>Edit Profil</p></Link>
                </div>
                <div className="profile-info">
                    <h3>AYUNE COINS</h3>
                    <p>Saldo &nbsp; <strong>3.500</strong></p>
                </div>
            </div>
          <form className="profile-info">
            <label htmlFor="name">Nama</label>
            <input id="name" type="text" placeholder="Masukan nama anda" />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Masukan Email anda" />

            <label htmlFor="phone">Nomor Telepon</label>
            <input id="phone" type="text" placeholder="Masukan Nomor Telepon Anda" />

            <label htmlFor="dob">Tanggal Lahir</label>
            <input id="dob" type="text" placeholder="Masukan Tanggal Lahir Anda (DD/MM/YYYY)" />

            <label htmlFor="gender">Jenis Kelamin</label>
            <input id="gender" type="text" placeholder="Masukan Gender Anda" />

            <Link to="/profil">
            <button type="button" className="logout-btn-simpan">
              Simpan Perubahan
            </button>
            </Link>    
            
          </form>
        </div>

        <div className="profile-main">
          <h1 className="section-title">Profil Kulit</h1>
          <form className="skin-profile">
            <label htmlFor="skinType">Tipe Kulit:</label>
            <textarea id="skinType" placeholder="Kulit Kering"></textarea>

            <label htmlFor="skinConcerns">Masalah Kulit:</label>
            <textarea
              id="skinConcerns"
              placeholder="Kulit saya terasa sangat kering hingga terkelupas (Dryness), Dan juga sensitif (Sensitive Skin)"
            ></textarea>
          </form>
        </div>
      </div>
      </div>
      
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
          <div className="popup-header">Anda Yakin Ingin Keluar?</div>
            <div className="popup-button-container">
              <button className="popup-button btn-cancel" onClick={togglePopup}>Batal</button>
              <button className="popup-button btn-exit" onClick={handleLogout}>Keluar</button>
            </div>
          </div>
        </div>
      )}

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilEdit;
