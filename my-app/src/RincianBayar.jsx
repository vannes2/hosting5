import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import "./file_css/rincianbayar.css";

const RincianBayar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const { dokter } = location.state || {}; // Mengambil data dokter dari state

  const serviceFee = 2000; // Biaya layanan tetap
  const totalPrice = dokter ? dokter.harga_dokter + serviceFee : 0; // Menghitung total pembayaran

  useEffect(() => {
    if (!dokter) {
      console.error("Data dokter tidak ditemukan.");
    }
  }, [dokter]);

  // Jika data dokter tidak ditemukan
  if (!dokter) {
    return (
      <div className="rincianbayar-page">
        <Header />
        <div className="bayar-page">
          <div className="error-message">
            <h2>Data dokter tidak ditemukan.</h2>
            <Link to="/ahli">
              <button className="back-button">Kembali ke daftar ahli</button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Fungsi untuk navigasi ke halaman OpsiBayar
  const handleNavigateToPayment = () => {
    navigate("/OpsiBayar", { state: { totalPrice } }); // Navigasi ke OpsiBayar dengan state totalPrice
  };

  return (
    <div className="rincianbayar-page">
      <Header />
      <div className="bayar-page">
        <main className="payment-details">
          <div className="title">
            <h1>Rincian Pembayaran</h1>
          </div>
          <div className="card">
            <div className="doctor-info">
              <img
                src={dokter.gambar}
                alt={dokter.nama_dokter}
                className="doctor-photo"
              />
              <div className="doctor-details">
                <strong>{dokter.nama_dokter}</strong>
                <p>Spesialis {dokter.bidang_dokter}</p>
              </div>
            </div>
            <div className="price-info">
              <p>Biaya sesi 30 menit</p>
              <span>Rp {dokter.harga_dokter.toLocaleString()}</span>
            </div>
            <div className="price-info">
              <p>Biaya layanan</p>
              <span>Rp {serviceFee.toLocaleString()}</span>
            </div>
            <div className="total-price">
              <strong>Total Pembayaranmu</strong>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>
            {/* Tombol untuk navigasi */}
            <button className="pay-button" onClick={handleNavigateToPayment}>
              Bayar
            </button>
          </div>
          <div className="footer-separator"></div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default RincianBayar;
