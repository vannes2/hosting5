import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./file_css/index.css"; // Pastikan untuk mengimpor file CSS jika diperlukan

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        confirmPassword,
        gender,
        birthdate,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Pendaftaran berhasil");
      navigate("/HomeAfterLogin");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="signup-page">
      <header>
        <div className="logo">
          <img src="assets/images/logobesar.svg" alt="Logo Ayune" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">BERANDA</Link>
            </li>
            <li>
              <Link to="/AboutUs">TENTANG KAMI</Link>
            </li>
            <li>
              <Link to="#">PRODUK</Link>
            </li>
            <li>
              <Link to="#">KONSULTASI</Link>
            </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/Login">
            <button>Masuk</button>
          </Link>
        </div>
      </header>

      <section>
        <div className="signup-title">
          <h1>Buat Akun</h1>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Masukan Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Masukan Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Masukan Nomor Telepon Anda"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <div className="form-row">
              <div className="form-column">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Masukan Kata Sandi Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-column">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Masukan Konfirmasi Kata Sandi Anda"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-column">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Pilih Gender</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div className="form-column">
                <label htmlFor="birthdate">Birth Date</label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  placeholder="Masukan Tanggal Lahir Anda"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="checkbox-label">
              <input type="checkbox" id="terms" name="terms" required />
              <label htmlFor="terms" className="terms">
                Dengan mendaftar ke Ayune, Anda telah menyetujui{" "}
                <a href="#">syarat &amp; ketentuan</a> dan{" "}
                <a href="#">kebijakan privasi</a>
              </label>
            </div>
            <br />
            <button type="submit" className="btn">
              Mendaftar
            </button>
          </form>
        </div>
      </section>

      {/* footer */}
      <footer className="aboutus-footer">
        <div className="footer-separator"></div>
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
                <Link to="#">Profil</Link>
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

export default SignUp;
