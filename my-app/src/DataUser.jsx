import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./file_css/datauser.css";
import AdminGuard from "./AdminGuard";

const DataUser = () => {
  const [dataUser, setDataUser] = useState([]);
  const [formData, setFormData] = useState({
    nama_user: "",
    email_user: "",
    no_hp_user: "",
    tgl_user: "",
    jk_user: "L",
    koin: 0,
    id_tipe_kulit: 1,
    id_masalah_kulit: 1,
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
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const users = await response.json();
      console.log("Data pengguna yang diambil:", users);
      setDataUser(users);
    } catch (error) {
      console.error("Error fetching users:", error);
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
    setFormData({
      ...formData,
      [name]: name === "jk_user" ? value : value, // Menyesuaikan langsung berdasarkan dropdown
    });
  };

  const handleAdd = async () => {
    try {
      console.log("Data yang akan ditambahkan:", formData); // Logging data yang akan ditambahkan
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchUsers();
        setFormData({
          nama_user: "",
          email_user: "",
          no_hp_user: "",
          tgl_user: "",
          jk_user: "Laki-laki",
          koin: 0,
          id_tipe_kulit: 1,
          id_masalah_kulit: 1,
        });
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEdit = (id) => {
    const user = dataUser.find((u) => u.id === id);
    setFormData({
      nama_user: user.nama_user || "",
      email_user: user.email_user || "",
      no_hp_user: user.no_hp_user || "",
      tgl_user: user.tgl_user ? user.tgl_user.split("T")[0] : "",
      jk_user: user.jk_user || "L",
      koin: user.koin || 0,
      id_tipe_kulit: user.id_tipe_kulit || 1,
      id_masalah_kulit: user.id_masalah_kulit || 1,
    });
    setIsEditing(true);
    setEditId(id);
  };

  const handleUpdate = async () => {
    try {
      console.log("Data yang akan diupdate:", formData);
      await fetch(`http://localhost:5000/api/users/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchUsers();
      setFormData({
        nama_user: "",
        email_user: "",
        no_hp_user: "",
        tgl_user: "",
        jk_user: "L",
        koin: 0,
        id_tipe_kulit: 1,
        id_masalah_kulit: 1,
      });
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("ID yang akan dihapus:", id); // Logging ID yang akan dihapus
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUser = dataUser.filter(
    (user) =>
      user.nama_user &&
      user.nama_user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminGuard>
      <div className="datauser">
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
          <h1>Data User</h1>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Cari nama user..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <p>
            Kelola <strong>Data User</strong> dengan bijak!
          </p>

          <div className="form-container">
            <div className="input-group">
              <input
                type="text"
                name="nama_user"
                placeholder="Nama"
                value={formData.nama_user}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email_user"
                placeholder="Email"
                value={formData.email_user}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="no_hp_user"
                placeholder="Nomor Telepon"
                value={formData.no_hp_user}
                onChange={handleChange}
              />
              <input
                type="date"
                name="tgl_user"
                value={formData.tgl_user}
                onChange={handleChange}
              />

              <select
                name="jk_user"
                value={formData.jk_user}
                onChange={handleChange}
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>

              <input
                type="number"
                name="koin"
                placeholder="Coins"
                value={formData.koin}
                onChange={handleChange}
              />

              <select
                name="id_tipe_kulit"
                value={formData.id_tipe_kulit}
                onChange={handleChange}
              >
                <option value="1">Kulit kering</option>
                <option value="2">Kulit kombinasi</option>
                <option value="3">Kulit normal</option>
                <option value="4">Kulit berminyak</option>
                <option value="5">Kulit sensitif</option>
              </select>
              <select
                name="id_masalah_kulit"
                value={formData.id_masalah}
                onChange={handleChange}
              >
                <option value="1">Jerawat & komedo</option>
                <option value="2">Penuan</option>
                <option value="3">Pigmentasi</option>
                <option value="4">Tekstur kulit</option>
                <option value="5">Kering & sensitif</option>
              </select>
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
                <th>Nama</th>
                <th>Email</th>
                <th>Nomor Telepon</th>
                <th>Tanggal Lahir</th>
                <th>Jenis Kelamin</th>
                <th>Coins</th>
                <th>Tipe Kulit</th>
                <th>Masalah Kulit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUser.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.nama_user}</td>
                  <td>{user.email_user}</td>
                  <td>{user.no_hp_user}</td>
                  <td>{user.tgl_user}</td>
                  <td>{user.jk_user === "L" ? "Laki-laki" : "Perempuan"}</td>
                  <td>{user.koin}</td>
                  <td>{user.nama_tipe_kulit}</td>
                  <td>{user.nama_masalah_kulit}</td>
                  <td>
                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
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

export default DataUser;
