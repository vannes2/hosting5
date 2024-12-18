import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./file_css/datadokter.css";
import AdminGuard from "./AdminGuard";

const DataDokter = () => {
  const [dataDokter, setDataDokter] = useState([]);
  const [formData, setFormData] = useState({
    nama_dokter: "",
    gambar: "",
    bidang_dokter: "Kulit Sensitif",
    riwayat_dokter: "",
    jadwal: "",
    harga_dokter: "",
    is_available: 1,
    rating: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    } else {
      fetchDataDokter();
    }
  }, [navigate]);

  const fetchDataDokter = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dokters");
      if (response.ok) {
        const dokters = await response.json();
        setDataDokter(dokters);
      } else {
        console.error("Failed to fetch dokters:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching dokters:", error);
    }
  };

  const handleKeluar = () => {
    setShowPopup(true);
  };

  const handleConfirmKeluar = () => {
    localStorage.removeItem("token");
    navigate("/LoginAdmin");
  };

  const handleCancelKeluar = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, gambar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dokters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchDataDokter();
        setFormData({
          nama_dokter: "",
          gambar: "",
          bidang_dokter: "Kulit Sensitif",
          riwayat_dokter: "",
          jadwal: "",
          harga_dokter: "",
          is_available: 1,
          rating: 0,
        });
      } else {
        console.error("Error adding dokter:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding dokter:", error);
    }
  };

  const handleEdit = (id) => {
    const dokter = dataDokter.find((d) => d.id === id);
    setFormData(dokter);
    setIsEditing(true);
    setEditId(id);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/dokters/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        fetchDataDokter();
        setFormData({
          nama_dokter: "",
          gambar: "",
          bidang_dokter: "Kulit Sensitif",
          riwayat_dokter: "",
          jadwal: "",
          harga_dokter: "",
          is_available: 1,
          rating: 0,
        });
        setIsEditing(false);
        setEditId(null);
      } else {
        console.error("Error updating dokter:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating dokter:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dokters/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchDataDokter();
      } else {
        console.error("Error deleting dokter:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting dokter:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDokter = dataDokter.filter((dokter) =>
    dokter.nama_dokter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminGuard>
      <div className="datadokters">
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
          <h1>Data Dokter</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Cari nama dokter..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <p>
            Silakan kelola <strong>Data Dokter</strong> dengan apik ya rek!
          </p>

          <div className="form-container">
            <div className="input-group">
              <input
                type="file"
                name="gambar"
                accept="image/*"
                onChange={handleFileUpload}
              />
              {formData.gambar && (
                <img
                  src={formData.gambar}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
              <input
                type="text"
                name="nama_dokter"
                placeholder="Nama Dokter"
                value={formData.nama_dokter}
                onChange={handleChange}
              />
              <select
                name="bidang_dokter"
                value={formData.bidang_dokter}
                onChange={handleChange}
              >
                <option value="Spesialis Anti-aging">
                  Spesialis Anti-aging
                </option>
                <option value="Spesialis Dermatovenereologi Estetika">
                  Spesialis Dermatovenereologi Estetika
                </option>
                <option value="Spesialis Kulit & Kelamin">
                  Spesialis Kulit & Kelamin
                </option>
                <option value="Spesialis Kulit Kusam, Pigmentasi">
                  Spesialis Kulit Kusam, Pigmentasi
                </option>
                <option value="Spesialis Kulit Sensitif, Alergi">
                  Spesialis Kulit Sensitif, Alergi
                </option>
                <option value="Spesialis Kulit Ibu Hamil, Stretch Mark">
                  Spesialis Kulit Ibu Hamil, Stretch Mark
                </option>
                <option value="Spesialis jerawat, Bekas Jerawat">
                  Spesialis jerawat, Bekas Jerawat
                </option>
                <option value="Spesialis Keloid, Bekas Luka">
                  Spesialis Keloid, Bekas Luka
                </option>
                <option value="Spesialis Kulit Kusam & Penuaan Dini">
                  Spesialis Kulit Kusam & Penuaan Dini
                </option>
              </select>
              <input
                type="text"
                name="riwayat_dokter"
                placeholder="Riwayat Dokter"
                value={formData.riwayat_dokter}
                onChange={handleChange}
              />
              <input
                type="text"
                name="jadwal"
                placeholder="Jadwal"
                value={formData.jadwal}
                onChange={handleChange}
              />
              <input
                type="text"
                name="harga_dokter"
                placeholder="Harga Dokter"
                value={formData.harga_dokter}
                onChange={handleChange}
              />
              <select
                name="is_available"
                value={formData.is_available}
                onChange={handleChange}
              >
                <option value={1}>Aktif</option>
                <option value={0}>Tidak Aktif</option>
              </select>
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={formData.rating}
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
                <th>Foto</th>
                <th>Nama</th>
                <th>Bidang</th>
                <th>Riwayat</th>
                <th>Rating</th>
                <th>Jadwal</th>
                <th>Harga</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDokter.map((dokter, index) => (
                <tr key={dokter.id}>
                  <td>{index + 1}</td>
                  <td>
                    {dokter.gambar ? (
                      <img
                        src={dokter.gambar}
                        alt={`Foto ${dokter.nama_dokter}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{dokter.nama_dokter}</td>
                  <td>{dokter.bidang_dokter}</td>
                  <td>{dokter.riwayat_dokter}</td>
                  <td>{dokter.rating} ⭐</td> {/* Tampilkan rating */}
                  <td>{dokter.jadwal}</td>
                  <td>{dokter.harga_dokter}</td>
                  <td>{dokter.is_available ? "Aktif" : "Tidak Aktif"}</td>
                  <td>
                    <button onClick={() => handleEdit(dokter.id)}>Edit</button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(dokter.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default DataDokter;
