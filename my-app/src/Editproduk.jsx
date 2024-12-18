import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Add Link import
import "./file_css/datadokter.css"; // Pastikan path CSS benar
import AdminGuard from "./AdminGuard";

const EditDeskripsiProduk = () => {
  const { id } = useParams(); // Untuk mendapatkan ID produk yang ingin diedit
  const [produk, setProduk] = useState({
    deskripsi: "",
    komposisi: "",
    caraPemakaian: "",
    harga: "",
    linkShopee: "",
    linkTokped: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi

  // Mengambil data produk berdasarkan ID (ini contoh, sesuaikan dengan API atau data yang Anda punya)
  useEffect(() => {
    const fetchedProduk = {
      deskripsi:
        "Facial foam terbaru dari Senka yang dapat membuat kulit wajahmu bersih, lembap, dan tampak cerah merona alami! Diformulasikan dengan Mixed Berries (Cranberry & Raspberry) yang kaya antioksidan, Perfect Whip Berry Bright dapat membuat kulit wajah tampak cerah merona (healthy blush). Selain itu, kandungan Japanese Yoshino Cherry Extract bisa membantu deep cleansing sel kulit mati dan kotoran secara lembut. Cocok digunakan bagi kulit normal hingga berminyak yang kusam, kering, dan terasa kasar.",
      komposisi:
        "Water (Aqua), Glycerin, Stearic Acid, Myristic Acid, Potassium Hyfroxide, Lauric Acid, PEG-8, Glyceryl Stearate SE, Sodium Methyl Cocoyl Taurate, Polyquaternium-7, Fragrance, Acrylates Copolymer, Disodium EDTA, Sodium Citrate, Algin, Sodium Benzoate, Sodium Metabisulfite, Phenoxyethanol, Caprylyl Glycol, Chondrus Crispus, Iron Oxides, Sodium Lauryl Sulfate, Clacium Chloride, RED 30, PEG/PPG-14/7 Dimethyl Ether, Vaccinium Macrocarpon (Cranberry) Fruit Extract, Butylene Glycol, Sericin, Lauryl Glucoside, Potassium Sorbate, Citric Acid, Prunus Yedoensis Leaf Extract, Sodium Acetylated Hyaluronate, Sodium Hyaluronate, Sorbic Acid, Glycyrrhiza Glabra (Licorice) Root Extract, Rubus Idaeus (Raspberry) Fruit Extract.",
      caraPemakaian:
        "1. Cuci tangan hingga bersih dan keluarkan Senka Perfect Whip kurang lebih 2 cm di atas permukaan tangan 2 Beri air kurang lebih sebanyak 1 sendok teh 3. Buat Gerakan melingkar 0 untuk menghasilkan foam yang tebal dan padat 4. Usapkan dan gunakan foam untuk cuci muka",
      harga: "Rp72.000 - Rp80.000",
    };

    // Set data produk ke state jika ID cocok
    setProduk(fetchedProduk);
    setIsEditing(true);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduk({ ...produk, [name]: value });
  };

  const handleUpdate = () => {
    // Update produk logic (misalnya, panggil API untuk update data produk)
    console.log("Data produk setelah update:", produk);
    // Navigasi kembali ke halaman sebelumnya setelah update
    navigate("/DataProduk");
  };

  return (
    <AdminGuard>
      <div className="data-page">
        <header>
          <div className="logo">
            <img src="assets/images/logobesar.png" alt="Logo Ayune" />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/HomeAfterLogin">DASHBOARD</Link>
              </li>
              <li>
                <Link to="/AboutUs_Login">DATA PRODUK</Link>
              </li>
              <li>
                <Link to="/Datadokter">DATA DOKTER</Link>
              </li>
              <li>
                <Link to="/Ahli">DATA USER</Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main content */}
        <main>
          <h1>Edit Data Produk</h1>

          <div className="form-container">
            <div className="input-group">
              <textarea
                type="text"
                name="deskripsi"
                placeholder="Deskripsi"
                value={produk.deskripsi}
                onChange={handleChange}
              />
              <textarea
                name="komposisi"
                placeholder="Komposisi"
                value={produk.komposisi}
                onChange={handleChange}
              />
              <textarea
                name="caraPemakaian"
                placeholder="Cara Pemakaian"
                value={produk.caraPemakaian}
                onChange={handleChange}
              />
              <textarea
                type="text"
                name="harga"
                placeholder="Harga"
                value={produk.harga}
                onChange={handleChange}
              />
              <br />
              <input
                type="text"
                name="link-shopee"
                placeholder="Link Shopee"
                value={produk.linkShopee}
                onChange={handleChange}
              />
              <input
                type="text"
                name="link-tokped"
                placeholder="Link Tokopedia"
                value={produk.linkTokped}
                onChange={handleChange}
              />
            </div>

            <div className="auth-buttons">
              <button onClick={handleUpdate}>Update Data Produk</button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="aboutus-footer">
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
    </AdminGuard>
  );
};

export default EditDeskripsiProduk;
