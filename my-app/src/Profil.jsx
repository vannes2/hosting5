import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import "./file_css/profil.css";

const Profil = ({ user }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSkinTypeId, setSelectedSkinTypeId] = useState("");
  const [selectedSkinProblemId, setSelectedSkinProblemId] = useState("");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });
  const navigate = useNavigate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogout = () => {
    navigate("/");
  };

  // Fungsi untuk mengambil data profil
  useEffect(() => {
    if (user?.id) {
      const fetchProfileData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/user/profile/${user.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch profile data");
          }
          const data = await response.json();
          setProfileData(data);
          setSelectedSkinTypeId(data.id_tipe_kulit || "");
          setSelectedSkinProblemId(data.id_masalah_kulit || "");
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };

      fetchProfileData();
    }
  }, [user]);

  // Fungsi untuk menyimpan data profil
  const handleSaveProfile = async () => {
    if (
      !user?.id ||
      !selectedSkinTypeId ||
      !selectedSkinProblemId ||
      !profileData.name ||
      !profileData.email
    ) {
      alert("Semua data harus diisi!");
      return;
    }

    const profileDataToSave = {
      userId: user.id,
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      dob: profileData.dob,
      gender: profileData.gender,
      id_tipe_kulit: selectedSkinTypeId,
      id_masalah_kulit: selectedSkinProblemId,
    };

    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileDataToSave),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await response.json();
      alert("Profil berhasil disimpan!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Terjadi kesalahan saat menyimpan profil.");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="header-divider">
        <span className="header-divider-text">Profil</span>
      </div>
      <div className="luar">
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-coin-container">
              <div className="profile-picture">
                <img src="assets/images/emptyprofile.png" alt="Edit Profile" />
                <p>Edit Profil</p>
              </div>
              <div className="profile-info">
                <h3>AYUNE COINS</h3>
                <p>
                  Saldo &nbsp; <strong>185.000</strong>
                </p>
              </div>
            </div>
            <form className="profile-info">
              <label htmlFor="name">Nama</label>
              <input
                id="name"
                type="text"
                placeholder="Masukan nama anda"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Masukan Email anda"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />

              <label htmlFor="phone">Nomor Telepon</label>
              <input
                id="phone"
                type="text"
                placeholder="Masukan Nomor Telepon Anda"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
              />

              <label htmlFor="dob">Tanggal Lahir</label>
              <input
                id="dob"
                type="text"
                placeholder="Masukan Tanggal Lahir Anda (DD/MM/YYYY)"
                value={profileData.dob}
                onChange={(e) =>
                  setProfileData({ ...profileData, dob: e.target.value })
                }
              />

              <label htmlFor="gender">Jenis Kelamin</label>
              <input
                id="gender"
                type="text"
                placeholder="Masukan Gender Anda"
                value={profileData.gender}
                onChange={(e) =>
                  setProfileData({ ...profileData, gender: e.target.value })
                }
              />

              <button
                type="button"
                className="logout-btn"
                onClick={togglePopup}
              >
                Keluar Akun
              </button>
            </form>
          </div>

          <div className="profile-main">
            <h1 className="section-title">Profil Kulit</h1>
            <form>
              <label htmlFor="skin-type">Tipe Kulit</label>
              <select name="skin-type" id="skin-type" className="wide-select">
                <option value="">Pilih jenis kulit...</option>
                <option value="normal">Kulit Normal</option>
                <option value="oily">Kulit Berminyak</option>
                <option value="dry">Kulit Kering</option>
                <option value="sensitive">Kulit Sensitif</option>
                <option value="combination">Kulit Kombinasi</option>
              </select>

              <br />

              <label htmlFor="skin-issue">Masalah Kulit</label>
              <select name="skin-issue" id="skin-issue" className="wide-select">
                <option value="">Pilih masalah kulit...</option>
                <option value="jerawat & komedo">Jerawat & Komedo</option>
                <option value="penuaan">Penuaan</option>
                <option value="pigmentasi">Pigmentasi</option>
                <option value="tekstur kulit">Tekstur Kulit</option>
                <option value="kering & sensitif">Kering & Sensitif</option>
              </select>

              <br />
              <br />

              <button
                type="button"
                className="logout-btn-simpan"
                onClick={handleSaveProfile}
              >
                Simpan Profil
              </button>
            </form>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">Anda Yakin Ingin Keluar?</div>
            <div className="popup-button-container">
              <button className="popup-button btn-cancel" onClick={togglePopup}>
                Batal
              </button>
              <button className="popup-button btn-exit" onClick={handleLogout}>
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profil;
