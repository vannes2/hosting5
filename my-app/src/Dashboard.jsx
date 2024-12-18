import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Header from "./components/HeaderDokter";
// import Footer from "./components/Footer";
import "./file_css/dashboard.css"; // Pastikan file CSS sudah tersedia

const Dashboard = () => {
  const navigate = useNavigate();

  // Contoh data ulasan produk
  const ulasanProduk = [
    {
      id: 1,
      namaproduk: "SENKA - Perfect Whip Berry Bright",
      nama: "Miranda Bella",
      umur: "28 tahun",
      tanggalulasan: "10/10/2024",
      tipekulit: "Kering",
      masalahKulit: "Sangat Kering, Sensitif",
      rating: 4,
      ulasan:
        "Busanya banyak dan lembut bgt jd bikin mood buat cuci muka 🥰 wangi buahnya seger, setelah pakai wajah jd lembab dan gabikin kering ketarik gt 💯",
    },
    {
      id: 2,
      namaproduk: "SENKA - Perfect Whip Berry Bright",
      nama: "Ariana Joe",
      umur: "19 Tahun",
      tanggalulasan: "01/10/2024",
      tipekulit: "Kering",
      masalahKulit: "Sangat Kering,",
      rating: 5,
      ulasan:
        "Bikin cerahan banget, jerawat yg aktif dan meradang jadi kempes dalam semalam, teksturnya lembut banget, tapi untuk aku di kulit yang kombinasi ini bikin beberapa area jadi kering tp overall baguss bangett sihh karna tinggal lanjut skincarean aja deh biar kulitnya moist lagii",
    },
    {
      id: 2,
      namaproduk: "SENKA - Perfect Whip Berry Bright",
      nama: "Sandrina",
      umur: "19 Tahun",
      tanggalulasan: "27/09/2024",
      tipekulit: "Kombinasi",
      masalahKulit: "Sensitif",
      rating: 5,
      ulasan:
        "Facial foam dari Senka yang ada kandungan mixed berries yang kaya akan antioksidan, saat pakai facial foam ini dia punya foam yang lembut banget di kulit, busanya juga banyak, ada sedikit aroma tapi aromanya enak, dan facial foam ini meresap banget ke kulit bikin kulit lebih cerah, sehat dan lembab",
    },
  ];

  // Contoh data ulasan dokter
  const ulasanDokter = [
    {
      id: 1,
      namadokter: "dr. Emy Kusumaningsih, Sp.Dv",
      spesialis: "Spesialis Dermatovenereologi Estetika",
      rating: 5,
      ulasan: "Dokter sangat ramah dan memberikan penjelasan yang jelas.",
    },
    {
      id: 2,
      namadokter: "dr. Clara, Sp.KK",
      spesialis: "SSpesialis Kulit Sensitif, Alergi",
      rating: 5,
      ulasan: "Dokter sangat ramah dan memberikan penjelasan yang jelas.",
    },
  ];

  const handleKeluar = () => {
    setShowPopup(true); // Tampilkan popup
  };

  const handleConfirmKeluar = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    navigate("/Login"); // Navigasi ke halaman LoginAdmin
  };

  const handleCancelKeluar = () => {
    setShowPopup(false); // Sembunyikan popup
  };

  const [showPopup, setShowPopup] = useState(false); // State untuk popup

  return (
    <div className="dashboard-page">
      <header>
        <div className="logo">
          <img src="assets/images/logobesar.svg" alt="Logo Ayune" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/Dashboard">DASHBOARD</Link>
            </li>
            <li>
              <Link to="/DataProduk">DATA PRODUK</Link>
            </li>
            <li>
              <Link to="/DataDeskripsiProduk">DATA DESKRIPSI PRODUK</Link>
            </li>
            <li>
              <Link to="/DataDokter">DATA DOKTER</Link>
            </li>
            <li>
              <Link to="/DataUser">DATA USER</Link>
            </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button onClick={handleKeluar}>Keluar</button>
        </div>
      </header>

      <main>
        <h1>Dashboard</h1>

        <h2>Selamat Datang, Admin!</h2>

        {/* Bagian Ulasan Produk */}
        <section className="ulasan-produk">
          <h3>Ulasan Produk</h3>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Produk</th>
                <th>Nama</th>
                <th>Umur</th>
                <th>Tanggal Ulasan</th>
                <th>Tipe Kulit</th>
                <th>Masalah Kulit</th>
                <th>Rating</th>
                <th>Ulasan</th>
              </tr>
            </thead>
            <tbody>
              {ulasanProduk.map((produk, index) => (
                <tr key={produk.id}>
                  <td>{index + 1}</td>
                  <td>{produk.namaproduk}</td>
                  <td>{produk.nama}</td>
                  <td>{produk.umur}</td>
                  <td>{produk.tanggalulasan}</td>
                  <td>{produk.tipekulit}</td>
                  <td>{produk.masalahKulit}</td>
                  <td>{produk.rating} ⭐</td>
                  <td>{produk.ulasan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Bagian Ulasan Dokter */}
        <section className="ulasan-dokter">
          <h3>Ulasan Dokter</h3>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Dokter</th>
                <th>Spesialis</th>
                <th>Rating</th>
                <th>Ulasan</th>
              </tr>
            </thead>
            <tbody>
              {ulasanDokter.map((dokter, index) => (
                <tr key={dokter.id}>
                  <td>{index + 1}</td>
                  <td>{dokter.namadokter}</td>
                  <td>{dokter.spesialis}</td>
                  <td>{dokter.rating} ⭐</td>
                  <td>{dokter.ulasan || "Tidak ada ulasan"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">Konfirmasi Keluar</div>
            <p>Apakah Anda yakin ingin keluar?</p>
            <div className="popup-button-container">
              <button onClick={handleConfirmKeluar}>Yakin</button>
              <button onClick={handleCancelKeluar}>Batal</button>
            </div>
          </div>
        </div>
      )}

      <footer className="dashboard-footer">
        <div className="footer-separator full-width"></div>
        <div className="footer-container">
          <div className="footer-logo">
            <img src="assets/images/logobesar.svg" alt="Logo Ayune" />
          </div>
          <div className="footer-content">
            <div className="customer-care">
              <h3>Layanan Pelanggan</h3>
              <p>Whatsapp: +62-851-6564-4356</p>
              <p>Instagram: @ayunneconsultation</p>
              <p>Email: ayunneconsultation@gmail.com</p>
              <p>
                <strong>Jam operasional:</strong>
                <br />
                Senin-Jumat: 10:00 - 21:00 WIB
                <br />
                Sabtu: 10:00 - 17:00 WIB
              </p>
            </div>
            <div className="account">
              <h3>Akun Saya</h3>
              <p>
                <Link to="/profil">Profil</Link>
              </p>
              <p>
                <Link to="/signup">Daftar</Link>
              </p>
              <p>
                <Link to="/Login">Masuk</Link>
              </p>
            </div>
            <div className="social-media">
              <h3>Ikuti Kami:</h3>
              <div className="social-icons">
                <a href="#">
                  <img src="assets/images/instagram.png" alt="Instagram" />
                </a>
                <a href="#">
                  <img src="assets/images/twt.png" alt="Twitter" />
                </a>
                <a href="#">
                  <img src="assets/images/yt.png" alt="YouTube" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>©AYUNNE, 2024. ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
