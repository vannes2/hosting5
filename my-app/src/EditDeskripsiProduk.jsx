import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./file_css/datadokter.css";
import AdminGuard from "./AdminGuard";

const EditDeskripsiProduk = () => {
  const { id } = useParams(); // Untuk mendapatkan ID produk yang ingin diedit
  const [produk, setProduk] = useState({
    deskripsi: "",
    komposisi: "",
    cara_pemakaian: "",
    kisaran_harga: "",
    link_shopee: "",
    link_tokopedia: "",
  });
  const navigate = useNavigate(); // Hook untuk navigasi

  // Mengambil data produk berdasarkan ID
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/produk/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduk(data);
        } else {
          console.error('Error fetching produk:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching produk:', error);
      }
    };

    fetchProduk();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduk({ ...produk, [name]: value });
  };

  const handleUpdate = async () => {
    const { deskripsi, komposisi, caraPemakaian, harga, linkShopee, linkTokped } = produk;
    const cleanedData = { 
      deskripsi, 
      komposisi, 
      cara_pemakaian: caraPemakaian, 
      kisaran_harga: harga, 
      link_shopee: linkShopee, 
      link_tokopedia: linkTokped 
    };
  
    console.log("Data produk yang akan diupdate:", cleanedData); // Logging data sebelum mengupdate produk
  
    // Validasi data sebelum mengirim permintaan PUT
    if (!deskripsi || !komposisi || !cleanedData.cara_pemakaian || !cleanedData.kisaran_harga || !cleanedData.link_shopee || !cleanedData.link_tokopedia) {
      console.error("Error: Data produk tidak lengkap", cleanedData);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/produk/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });
  
      if (response.ok) {
        console.log('Data produk setelah update:', cleanedData);
        navigate("/DataProduk");
      } else {
        console.error('Error updating produk:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating produk:', error);
    }
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
                value={produk.cara_pemakaian}
                onChange={handleChange}
              />
              <textarea
                type="text"
                name="harga"
                placeholder="Harga"
                value={produk.kisaran_harga}
                onChange={handleChange}
              />
              <br />
              <input
                type="text"
                name="linkShopee"
                placeholder="Link Shopee"
                value={produk.link_shopee}
                onChange={handleChange}
              />
              <input
                type="text"
                name="linkTokped"
                placeholder="Link Tokopedia"
                value={produk.link_tokpedia}
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
