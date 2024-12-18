import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./file_css/consul.css"; // Pastikan path CSS benar
import { io } from "socket.io-client";
import moment from "moment";
import axios from "axios";




const ConsulDokter = () => {
  const [showPopup, setShowPopup] = useState(false); // State untuk pop-up pertama
  const [showSecondPopup, setShowSecondPopup] = useState(false); // State untuk pop-up kedua
  const [rating, setRating] = useState(0); // State untuk menyimpan rating
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null); // Menggunakan useRef agar tidak terbuat ulang


  const senderId = 2; // ID Dokter
  const receiverId = 1; // ID Pasien

  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup); // Ubah state showPopup
  };


  const handleButtonClick = () => {
    fileInputRef.current.click(); // Membuka dialog upload file
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      // Lakukan sesuatu dengan file yang diunggah, misalnya mengunggah ke server
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1); // Set rating berdasarkan bintang yang diklik
  };

  const handleUploadClick = () => {
    setShowPopup(false); // Tutup pop-up pertama
    setShowSecondPopup(true); // Buka pop-up kedua
  };

  const handleSecondPopupClose = () => {
    setShowSecondPopup(false); // Tutup pop-up kedua

    navigate("/Recom"); // Navigasi ke halaman rekomendasi
  };

  const handleLogout = () => {
    navigate("/"); // Navigasi ke halaman utama
  };

  useEffect(() => {
    // Buat koneksi socket hanya sekali saat komponen dipasang
    if (!socket.current) {
      socket.current = io('http://localhost:5000');
    }

    // Ambil chat sebelumnya dari backend
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/chat', { 
          params: { senderId, receiverId }
        });
        setMessages(response.data.chats);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    // Ambil chat hanya jika senderId atau receiverId berubah
    if (senderId && receiverId) {
      fetchChats();
    }

    // Bergabung dengan room chat
    socket.current.emit('joinRoom', { senderId, receiverId });

    // Mendengarkan pesan yang diterima
    socket.current.on('receiveMessage', (newChat) => {
      setMessages((prevMessages) => [...prevMessages, newChat]);
    });

    // Membersihkan socket saat komponen dibersihkan
    return () => {
      socket.current.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const messageData = { senderId, receiverId, message, type: 'text' };

      // Kirim pesan ke backend
      await axios.post('http://localhost:5000/chat', messageData);


      setMessage('');
      setMessages((prevMessages) => [...prevMessages, messageData]);

    }
  };

  return (
    <div className="consul-page-container">
      <header>
        <div className="logo">
          <img src="assets/images/logobesar.svg" alt="Logo Ayune" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/HomeAfterLogin">BERANDA</Link>
            </li>
            <li>
              <Link to="/AboutUs_Login">TENTANG KAMI</Link>
            </li>
            <li>
              <Link to="/Produk">PRODUK</Link>
            </li>
            <li>
              <Link to="/Ahli">KONSULTASI</Link>
            </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/profil">
            <button>Ayyunie</button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="header-divider">
        <span className="header-divider-text">Konsultasi Pasien A.N Ayyunie</span>
      </div>

      <div>
        <section className="consultation">
        <div className="chat-section">
            <div className="chat-box relative bg-white rounded-lg shadow-md p-6 h-[650px] overflow-y-auto border border-gray-300">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.senderId === senderId ? "flex justify-end" : "flex justify-start"
                  }`}
                >
                  <div>
                    <div
                      className={`${
                        msg.senderId === senderId
                          ? "bg-[#E3F2ED] text-black"
                          : " bg-[#147A63] text-white"
                      } text-sm p-4 rounded-lg w-[400px] mb-1`}
                    >
                      <p>{msg.message}</p>
                    </div>
                    <p
                      className={`${
                        msg.senderId === senderId
                          ? "bg-[#E3F2ED] text-black"
                          : " bg-[#147A63] text-white"
                      } text-sm text-center w-fit px-3 py-1 rounded-lg `}
                    >
                      {moment(msg.createdAt).format("hh:mm")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="input-box mt-4 flex items-center bg-white rounded-lg shadow-md p-4 border border-gray-300">
              <input
                type="text"
                placeholder="Type here..."
                className="flex-1 border-none outline-none text-sm px-4 py-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div>
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => fileInputRef.current.click()}
                >
                  <img
                    src="assets/images/cam.png"
                    alt="Camera"
                    className="w-6 h-6"
                  />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => console.log(e.target.files)}
                />
              </div>
              <button
                type="button"
                className="ml-2"
                onClick={handleSendMessage}
              >
                <img
                  src="assets/images/send.png"
                  alt="Send"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          {/* Doctor Profile Section */}
          {/* <aside className="profile-section">
            <div className="doctor-profile">
              <h1>Profile Dokter</h1>
              <img
                src="assets/images/expert2.png"
                alt="Dr. Emy Kusumaningsih"
              />
              <h2>Dr. Emy Kusumaningsih, Sp.DV</h2>
              <h6>Dokter Spesialis Kulit</h6>
              <br />
              <p>
                Beliau merupakan dokter spesialis dermatovenereologi estetika
                kulit yang sudah lama bergabung di klinik kecantikan, tentunya
                pengalaman beliau sudah banyak tentang masalah kulit yang sering
                dialami oleh kebanyakan orang{" "}
              </p>
            </div>
            <br />
            <div className="skin-problems">
              <h1>Masalah Kulit</h1>
              <form action="recommendations.html" method="GET">
                <label htmlFor="skin-type">Tipe Kulit</label>
                <select name="skin-type" id="skin-type">
                  <option value="">Pilih jenis kulit...</option>
                  <option value="normal">Kulit Normal</option>
                  <option value="oily">Kulit Berminyak</option>
                  <option value="dry">Kulit Kering</option>
                  <option value="sensitive">Kulit Sensitif</option>
                  <option value="combination">Kulit Kombinasi</option>
                </select>

                <label htmlFor="skin-concerns">Kondisi Kulit:</label>
                <textarea
                  name="skin-concerns"
                  id="skin-concerns"
                  placeholder="Masukkan Kondisi Kulit Anda sesuai dengan hasil Konsultasi"
                ></textarea>

                <label htmlFor="age">Usia:</label>
                <input type="text" id="age" placeholder="Masukkan Usia" />

                <button type="button" onClick={togglePopup}>
                  Rekomendasi
                </button>
              </form>
            </div>
          </aside> */}
        </section>
      </div>

      {/* Review Pop-up */}
      {showPopup && (
        <div id="reviewPopup" className="popup-overlay-unggah">
          <div className="popup-content-unggah">
            <div className="popup-header">
              Berikan ulasan Dokter lalu dapatkan koin
            </div>
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
            <div className="tulis">
              <p>Tuliskan ulasan Anda (opsional*)</p>
            </div>
            <div>
              <textarea
                className="textarea"
                placeholder="Tambahkan ulasan tertulis jika anda ingin memberikan masukan"
              ></textarea>
            </div>
            <div className="popup-button-container">
              <button className="unggah-btn" onClick={handleUploadClick}>
                Unggah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Second Pop-up */}
      {showSecondPopup && (
        <div id="secondPopup" className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">Ulasan berhasil disimpan</div>
            <p className="selamat">SELAMAT!!</p>
            <p className="koin">500 KOIN</p>
            <p className="liat">Koin dapat dilihat pada halaman profil.</p>
            <div className="popup-button-container">
              <button className="rekom-btn" onClick={handleSecondPopupClose}>
                Rekomendasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer-separator"></div>
      <footer className="aboutus-footer">
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
                <Link to="/login">Masuk</Link>
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

export default ConsulDokter;
