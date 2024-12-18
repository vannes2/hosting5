import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import "./file_css/consul.css";

const socket = io("http://localhost:5000"); // Hubungkan ke backend di port 5000

const Consul = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showFirstPopup, setShowFirstPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);

  const navigate = useNavigate(); // Untuk navigasi ke halaman lain
  const location = useLocation();

  // Ambil data dokter dari state atau local storage
  const dokter =
    location.state?.dokter ||
    JSON.parse(localStorage.getItem("selectedDoctor"));

  useEffect(() => {
    if (dokter) {
      localStorage.setItem("selectedDoctor", JSON.stringify(dokter));
    } else {
      navigate("/ahli"); // Jika data dokter tidak ditemukan, arahkan ke halaman Ahli
    }

    // Konsultasi
    socket.on("message", (message) => {
      console.log("Pesan diterima di Consul:", message); // Log diterima
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msg = { sender: "dokter", text: message };
      console.log("Mengirim pesan dari Consul:", msg); // Log pengiriman
      socket.emit("message", msg);
      setMessage("");
    }
  };

  const handleShowFirstPopup = () => {
    setShowFirstPopup(true);
  };

  const handleUploadClick = () => {
    setShowFirstPopup(false);
    setShowSecondPopup(true);
  };

  const handleRekomendasi = () => {
    setShowSecondPopup(false);
    navigate("/Recom"); // Navigasikan ke halaman Recom
  };

  return (
    <div className="consul-page-container">
      <Header />

      <div className="header-divider">
        <span className="header-divider-text">Konsultasi</span>
      </div>

      <div>
        <section className="consultation">
          {/* Box Chat */}
          <div className="chat-section">
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="input-box">
              <form onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </form>
              <div id="cam-button">
                <button type="button">
                  <img src="assets/images/cam.png" alt="Camera" />
                </button>
              </div>
              <button type="submit">
                <img src="assets/images/send.png" alt="Send" />
              </button>
            </div>
          </div>

          <aside className="profile-section">
            {/* Profil Dokter */}
            <div className="doctor-profile">
              <h1>Profil Dokter</h1>
              <img
                src={dokter.gambar}
                alt={dokter?.nama_dokter || "Dokter Tidak Ditemukan"}
              />
              <h2>{dokter?.nama_dokter || "Dokter Tidak Ditemukan"}</h2>
              <h6>{dokter?.bidang_dokter || "Spesialisasi Tidak Tersedia"}</h6>
              <p>
                {dokter
                  ? `Beliau merupakan seorang ahli spesialis ${
                      dokter.bidang_dokter
                    } dengan pengalaman ${
                      dokter.riwayat_dokter || "tidak diketahui"
                    }.`
                  : "Informasi dokter tidak tersedia."}
              </p>
            </div>
            <br />

            {/* Input Masalah Kulit */}
            <div className="skin-problems">
              <h1>Masalah Kulit</h1>
              <form>
                <label htmlFor="skin-type">Tipe Kulit</label>
                <select name="skin-type" id="skin-type">
                  <option value="">Pilih jenis kulit...</option>
                  <option value="normal">Kulit Normal</option>
                  <option value="oily">Kulit Berminyak</option>
                  <option value="dry">Kulit Kering</option>
                  <option value="sensitive">Kulit Sensitif</option>
                  <option value="combination">Kulit Kombinasi</option>
                </select>

                <label htmlFor="skin-issue">Masalah Kulit</label>
                <select name="skin-issue" id="skin-issue">
                  <option value="">Pilih masalah kulit...</option>
                  <option value="jerawat & komedo">Jerawat & Komedo</option>
                  <option value="penuaan">Penuaan</option>
                  <option value="pigmentasi">Pigmentasi</option>
                  <option value="tekstur kulit">Tekstur Kulit</option>
                  <option value="kering & sensitif">Kering & Sensitif</option>
                </select>

                <label htmlFor="age">Usia:</label>
                <input type="text" id="age" placeholder="Masukkan Usia" />

                <button type="button" onClick={handleShowFirstPopup}>
                  Rekomendasi
                </button>
              </form>
            </div>
          </aside>
        </section>
      </div>

      {/* Pop-up pertama */}
      {showFirstPopup && (
        <div className="popup-overlay-unggah">
          <div className="popup-content-unggah">
            <div className="popup-header">
              Berikan ulasan Dokter lalu dapatkan koin
            </div>
            <div className="stars" id="starRating">
              <input type="radio" name="star" id="star1" />
              <label htmlFor="star1">★</label>
              <input type="radio" name="star" id="star2" />
              <label htmlFor="star2">★</label>
              <input type="radio" name="star" id="star3" />
              <label htmlFor="star3">★</label>
              <input type="radio" name="star" id="star4" />
              <label htmlFor="star4">★</label>
              <input type="radio" name="star" id="star5" />
              <label htmlFor="star5">★</label>
            </div>
            <div className="tulis">
              <p>Tuliskan ulasan Anda (opsional*)</p>
            </div>
            <textarea
              className="textarea"
              placeholder="Tambahkan ulasan tertulis jika anda ingin memberikan masukan"
            ></textarea>
            <div className="popup-button-container">
              <button className="unggah-btn" onClick={handleUploadClick}>
                Unggah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up kedua */}
      {showSecondPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">Ulasan berhasil disimpan</div>
            <p className="selamat">SELAMAT!!</p>
            <p className="koin">500 KOIN</p>
            <button className="rekom-btn" onClick={handleRekomendasi}>
              Rekomendasi
            </button>
          </div>
        </div>
      )}

      <div className="footer-separator full-width"></div>
      <Footer />
    </div>
  );
};

export default Consul;
