import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import "./file_css/ulasan_produk.css";

const UlasanProduk = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/Produk");
  };

  return (
    <div className="ulasan-produk-page">
      {/* header */}
      <Header />

      {/* content */}
      <main>
        <div className="title">
          <h1>Berikan Ulasan</h1>
        </div>
        <div className="coba">
          <section class="form-section">
            <label>Dimana anda membeli produk tersebut?</label>
            <div class="options">
              <button class="option" onClick="selectOption(this)">
                Online
              </button>
              <button class="option" onClick="selectOption(this)">
                Offline
              </button>
              <button class="option" onClick="selectOption(this)">
                Lainnya
              </button>
            </div>
            <label for="review">Tuliskan ulasan anda</label>
            <textarea
              id="review"
              placeholder="Beritahu kepada pengguna lain bagaimana pengalaman anda menggunakan produk ini, bagaimana efek nya? ..."
            ></textarea>
            <label>Berikan bintang</label>
            <div className="stars" id="starRating">
              <input type="radio" name="star" id="star1" />
              <label for="star1">★</label>
              <input type="radio" name="star" id="star2" />
              <label for="star2">★</label>
              <input type="radio" name="star" id="star3" />
              <label for="star3">★</label>
              <input type="radio" name="star" id="star4" />
              <label for="star4">★</label>
              <input type="radio" name="star" id="star5" />
              <label for="star5">★</label>
            </div>

            <label>Apakah anda merekomendasikan produk ini?</label>
            <div className="recommend">
              <button className="option">Ya</button>
              <button className="option">Tidak</button>
            </div>
            <button className="submit-button" onClick={handleUploadClick}>
              Unggah
            </button>
          </section>
        </div>
      </main>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popup-header">Ulasan berhasil disimpan</h3>
            <p className="selamat">SELAMAT!!</p>
            <p className="koin">500 KOIN</p>
            <p className="liat">Koin dapat dilihat pada halaman profil.</p>
            <div className="popup-button-container">
              <button className="rekom-btn" onClick={handlePopupClose}>
                Tutup
              </button>
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

export default UlasanProduk;
