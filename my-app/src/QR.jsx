import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Gunakan useLocation untuk menerima data
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import "./file_css/qr.css";

const QR = () => {
  const [showPopup, setShowPopup] = useState(false); // State untuk mengontrol pop-up
  const navigate = useNavigate();
  const location = useLocation(); // Gunakan useLocation untuk mendapatkan data dari state

  // Ambil totalPayment dari state (default 0 jika data tidak tersedia)
  const totalPayment = location.state?.totalPayment || 0;

  const handleCopyClick = () => {
    setShowPopup(true); // Menampilkan pop-up
  };

  const handleRedirect = () => {
    navigate("/Consul"); // Mengarahkan ke halaman konsultasi
  };

  return (
    <div className="qr-page-container">
      {/* header */}
      <Header />

      <main>
        <div className="title">
          <h1>Ayo Bayar</h1>
        </div>

        <div className="total">
          <div className="grid-kiri">
            <h4>Total Tagihan</h4>
            <h2>Pembayaranmu</h2>
          </div>
          <div className="grid-kanan">
            <h4>Rp {totalPayment.toLocaleString()}</h4>
            <h2>Rp {totalPayment.toLocaleString()}</h2>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="qr-code-section">
          <p>
            Mohon pastikan Anda telah membaca dan memahami{" "}
            <a href="#">Syarat & Ketentuan</a> serta{" "}
            <a href="#">Kebijakan Privasi</a> kami sebelum melanjutkan
            pembayaran. Setelah pembayaran berhasil, transaksi dianggap final
            dan tidak dapat dikembalikan.
          </p>
          <div className="qr-wrapper">
            <img src="assets/images/qrfix.jpg" alt="QR Code" />
          </div>
          <p>SCAN UNTUK BAYAR</p>
          <button type="button" className="copy-btn" onClick={handleCopyClick}>
            SALIN BARCODE
          </button>
        </div>
        <br></br>
      </main>

      {/* Popup */}
      {showPopup && (
        <div id="secondPopup" className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">Pembayaran Berhasil!</div>
            <div className="popup-title">
              <img
                src="assets/images/iconbayar.png"
                alt="Pembayaran Berhasil"
                className="popup-image"
              />
            </div>
            <div className="popup-button-container">
              <button className="copy-btn" onClick={handleRedirect}>
                Mulai Sesi
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

export default QR;
