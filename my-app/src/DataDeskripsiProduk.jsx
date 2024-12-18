import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./file_css/datadeskripsiproduk.css";
import AdminGuard from "./AdminGuard";

const Datadeskripsiproduk = () => {
  const [dataProduk, setDataProduk] = useState([]);
  const [tipeKulit, setTipeKulit] = useState([]);
  const [masalahKulit, setMasalahKulit] = useState([]);
  const [formData, setFormData] = useState({
    id_brand: "",
    nama: "",
    deskripsi: "",
    komposisi: "",
    cara_pemakaian: "",
    kisaran_harga: "",
    link_shopee: "",
    link_tokopedia: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/LoginAdmin");
    } else {
      fetchDataProduk();
      fetchTipeKulit();
      fetchMasalahKulit();
    }
  }, [navigate]);

  const fetchDataProduk = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/produk");
      if (response.ok) {
        const produk = await response.json();
        console.log("Fetched produk data:", produk); // Logging data yang diterima
        setDataProduk(produk);
      } else {
        console.error("Failed to fetch produk:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching produk:", error);
    }
  };

  const fetchTipeKulit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tipe-kulit");
      if (response.ok) {
        const tipeKulitData = await response.json();
        setTipeKulit(tipeKulitData);
      } else {
        console.error("Failed to fetch tipe kulit:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching tipe kulit:", error);
    }
  };

  const fetchMasalahKulit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/masalah-kulit");
      if (response.ok) {
        const masalahKulitData = await response.json();
        setMasalahKulit(masalahKulitData);
      } else {
        console.error("Failed to fetch masalah kulit:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching masalah kulit:", error);
    }
  };

  const handleKeluar = () => {
    setShowPopup(true);
  };

  const handleConfirmKeluar = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const handleCancelKeluar = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    const sanitizedFormData = {
      ...formData,

      id_brand: parseInt(formData.id_brand, 10),
      deskripsi: (formData.deskripsi, 1000),
      komposisi: (formData.komposisi, 1000),
      cara_pemakaian: (formData.cara_pemakaian, 1000),
      kisaran_harga: (formData.kisaran_harga, 1000),
      link_shopee: (formData.link_shopee, 1000),
      link_tokopedia: (formData.link_tokopedia, 1000),
      gambar: formData.gambar || "", // tambahkan nilai kosong untuk gambar jika tidak ada
    };

    console.log("Adding produk with data:", sanitizedFormData); // Logging data sebelum menambah produk
    try {
      const response = await fetch("http://localhost:5000/api/produk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedFormData),
      });

      if (response.ok) {
        fetchDataProduk();
        setFormData({
          id_brand: "",
          nama: "",
          deskripsi: "",
          komposisi: "",
          cara_pemakaian: "",
          kisaran_harga: "",
          link_shopee: "",
          link_tokopedia: "",
        });
      } else {
        console.error("Error adding produk:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding produk:", error);
    }
  };

  const handleEdit = (id) => {
    const produk = dataProduk.find((p) => p.id === id);
    setFormData({
      id_brand: produk.id_brand,
      nama: produk.nama_produk,
      deskripsi: produk.deskripsi,
      komposisi: produk.komposisi,
      cara_pemakaian: produk.cara_pemakaian,
      kisaran_harga: produk.kisaran_harga,
      link_shopee: produk.link_shopee,
      link_tokopedia: produk.link_tokopedia,
    });
    setIsEditing(true);
    setEditId(id);
  };

  const handleUpdate = async () => {
    console.log("Updating produk with data:", formData); // Logging data sebelum permintaan
    try {
      const response = await fetch(
        `http://localhost:5000/api/produk/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        fetchDataProduk();
        setFormData({
          id_brand: "",
          nama: "",
          deskripsi: "",
          komposisi: "",
          cara_pemakaian: "",
          kisaran_harga: "",
          link_shopee: "",
          link_tokopedia: "",
        });
        setIsEditing(false);
        setEditId(null);
      } else {
        console.error("Error updating produk:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating produk:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/produk/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchDataProduk();
      } else {
        console.error("Error deleting produk:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting produk:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProduk = dataProduk.filter(
    (produk) =>
      produk.nama_produk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produk.nama_brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get the name of the skin type by id
  const getTipeKulitName = (id) => {
    const tipe = tipeKulit.find((t) => t.id === id);
    return tipe ? tipe.nama_tipe : "";
  };

  // Function to get the name of the skin issue by id
  const getMasalahKulitName = (id) => {
    const masalah = masalahKulit.find((m) => m.id === id);
    return masalah ? masalah.nama_masalah : "";
  };

  return (
    <AdminGuard>
      <div className="data-deskripsi">
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
          <h1>Data Deskripsi Produk</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <p>
            Silakan kelola <strong>Data Deskripsi Produk</strong> dengan apik ya
            rek!
          </p>
          <div className="form-container">
            <div className="input-group">
              <input
                type="text"
                name="id_brand"
                placeholder="Nama Brand"
                value={formData.id_brand}
                onChange={handleChange}
              />
              <input
                type="text"
                name="nama"
                placeholder="Nama Produk"
                value={formData.nama}
                onChange={handleChange}
              />
              <input
                type="text"
                name="deskripsi"
                placeholder="Deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
              />
              <input
                type="text"
                name="komposisi"
                placeholder="Komposisi"
                value={formData.komposisi}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cara_pemakaian"
                placeholder="Cara Pemakaian"
                value={formData.cara_pemakaian}
                onChange={handleChange}
              />
              <input
                type="text"
                name="kisaran_harga"
                placeholder="Kisaran Harga"
                value={formData.kisaran_harga}
                onChange={handleChange}
              />
              <input
                type="text"
                name="link_shopee"
                placeholder="Link Shopee"
                value={formData.link_shopee}
                onChange={handleChange}
              />
              <input
                type="text"
                name="link_tokopedia"
                placeholder="Link Tokopedia"
                value={formData.link_tokopedia}
                onChange={handleChange}
              />
            </div>
            <div className="auth-buttons">
              <button onClick={isEditing ? handleUpdate : handleAdd}>
                {isEditing ? "Update Data" : "Tambah Data +"}
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Brand</th>
                <th>Nama Produk</th>
                <th>Deskripsi</th>
                <th>Komposisi</th>
                <th>Cara Pemakaian</th>
                <th>Kisaran Harga</th>
                <th>Link Shopee</th>
                <th>Link Tokopedia</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduk.map((produk, index) => (
                <tr key={produk.id}>
                  <td>{index + 1}</td>
                  <td>{produk.nama_brand}</td>
                  <td>{produk.nama_produk}</td>
                  <td>{produk.deskripsi}</td>
                  <td>{produk.komposisi}</td>
                  <td>{produk.cara_pemakaian}</td>
                  <td>{produk.kisaran_harga}</td>
                  <td>{produk.link_shopee}</td>
                  <td>{produk.link_tokopedia}</td>
                  <td>
                    <button onClick={() => handleEdit(produk.id)}>Edit</button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(produk.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {/* Popup konfirmasi */}
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

export default Datadeskripsiproduk;
