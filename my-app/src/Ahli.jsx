import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import "./file_css/pilihahli.css";

const Ahli = () => {
  const [doctors, setDoctors] = useState([]); // State untuk menyimpan data dokter
  const [searchTerm, setSearchTerm] = useState(""); // State untuk filter pencarian
  const navigate = useNavigate();

  // Ambil data dokter dari database melalui endpoint backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dokters"); // Endpoint backend
        const data = await response.json();
        setDoctors(data); // Simpan data dokter dalam state
      } catch (error) {
        console.error("Gagal mengambil data dokter:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Filter dokter berdasarkan pencarian
  const filteredDoctors = doctors.filter((dokter) =>
    dokter.nama_dokter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi navigasi universal
  const handleNavigate = (dokter, tujuan) => {
    console.log("Dokter yang dipilih:", dokter); // Debugging
    localStorage.setItem("selectedDoctor", JSON.stringify(dokter)); // Simpan dokter ke localStorage

    // Navigasi ke halaman tujuan
    navigate(`/${tujuan}`, { state: { dokter } });
  };

  return (
    <div className="ahli-page-container">
      <Header />

      <main>
        <div className="title">
          <h1>Pilih Ahli</h1>
          <input
            className="search-input"
            type="text"
            placeholder="Cari Dokter ahli untuk mengetahui kondisi kulit anda..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sub-title">
          <div className="sub-title-h2">
            <h2>Rekomendasi Ahli</h2>
          </div>
          <div className="sub-title-h4">
            <h4>Pilih ahli kulit yang sesuai dengan kebutuhan anda</h4>
          </div>
        </div>

        {/* Card Dokter */}
        <div className="all-cards">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((dokter) => (
              <div key={dokter.id} className="card-link">
                <div
                  className={`expert-card ${
                    dokter.is_available === 1 ? "clickable" : "disabled"
                  }`}
                  onClick={() => {
                    if (dokter.is_available === 1) {
                      handleNavigate(dokter, "rincianbayar"); // Navigasi ke rincianbayar
                    }
                  }}
                  style={{
                    cursor:
                      dokter.is_available === 1 ? "pointer" : "not-allowed",
                    color: "#000",
                  }}
                >
                  <img
                    className="expert-photo"
                    src={dokter.gambar}
                    alt={dokter.nama_dokter}
                    onClick={() => handleNavigate(dokter, "consul")} // Navigasi ke consul
                    style={{ cursor: "pointer" }}
                  />
                  <div className="expert-info">
                    <h3
                      className="dokter-name"
                      onClick={() => handleNavigate(dokter, "rincianbayar")}
                      style={{ cursor: "pointer", color: "#000" }}
                    >
                      {dokter.nama_dokter}
                    </h3>
                    <p className="specialty">{dokter.bidang_dokter}</p>
                    <div className="card-details">
                      <div className="experience">
                        <span>📅</span>
                        <span>{dokter.riwayat_dokter}</span>
                      </div>
                      <div className="rating">
                        <span>⭐</span>
                        <span>{dokter.rating}/5.0</span>
                      </div>
                    </div>
                    <div className="availability">
                      Tersedia: {dokter.jadwal || "Tidak Ada Jadwal"}
                    </div>
                    <p className="price">
                      Rp {parseInt(dokter.harga_dokter).toLocaleString()}
                    </p>
                    <button
                      className={`status ${
                        dokter.is_available === 1 ? "online" : "offline"
                      }`}
                    >
                      {dokter.is_available === 1
                        ? "Tersedia"
                        : "Tidak Tersedia"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading data dokter...</p> // Pesan loading jika data belum tersedia
          )}
        </div>
      </main>

      <div className="footer-separator full-width"></div>
      <Footer />
    </div>
  );
};

export default Ahli;
