import React from 'react';
import { Link } from 'react-router-dom';
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import './file_css/ulasan_ahli.css';

const UlasanAhli = () => {
  return (
    <div className="ulasanahli_page">
      {/* header */}
      <Header />

      {/* content */}
      <main>
        <h1>Berikan Ulasan</h1>
        <section class="form-section">
            <label>Dimana anda membeli produk tersebut?</label>
            <div class="options">
                <button class="option" onclick="selectOption(this)">Online</button>
                <button class="option" onclick="selectOption(this)">Offline</button>
                <button class="option" onclick="selectOption(this)">Lainnya</button>
            </div>
            <label for="review">Tuliskan ulasan anda</label>
            <textarea id="review" placeholder="Beritahu kepada pengguna lain bagaimana pengalaman anda menggunakan produk ini, bagaimana efek nya? ..."></textarea>
            <label>Berikan bintang</label>
            <div class="stars" id="starRating">
                <input type="radio" name="star" id="star1"/><label for="star1">★</label>
                <input type="radio" name="star" id="star2"/><label for="star2">★</label>
                <input type="radio" name="star" id="star3"/><label for="star3">★</label>
                <input type="radio" name="star" id="star4"/><label for="star4">★</label>
                <input type="radio" name="star" id="star5"/><label for="star5">★</label>
            </div>

            <label>Apakah anda merekomendasikan produk ini?</label>
            <div class="recommend">
                <button class="option" onclick="selectOption(this)">Ya</button>
                <button class="option" onclick="selectOption(this)">Tidak</button>
            </div>

            <button class="submit-button" onclick="showsuccessPopup()">Unggah</button>
        </section>
    </main>

    <div id="popupOverlay" class="popup-overlay"></div>

    {/* <!-- Pop-up pemberitahuan 10 koin --> */}
    <div id="successPopup" class="popup">
        <div class="popup-content">
            <h3>SELAMAT!!</h3>
            <p>Anda mendapatkan <strong>10 KOIN</strong></p>
            <p>Koin dapat dilihat pada halaman profil.</p>
            <button class="close-btn" onclick="BacktoProduct()">Tutup</button>
        </div>
    </div>

    <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UlasanAhli;
