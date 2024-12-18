import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Gunakan useNavigate dan useLocation
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import "./file_css/opsibayar.css";

const OpsiBayar = () => {
  const location = useLocation(); // Mengambil state dari halaman sebelumnya
  const totalPayment = location.state?.totalPrice || 0; // Ambil totalPayment dari state

  const [activeTab, setActiveTab] = useState("electronic"); // State untuk tab aktif
  const [selectedMethod, setSelectedMethod] = useState(""); // State untuk metode pembayaran
  const navigate = useNavigate(); // Untuk navigasi antar halaman

  // Ubah tab yang aktif
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedMethod(""); // Reset pilihan metode pembayaran
  };

  // Simpan metode pembayaran yang dipilih
  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  // Proses pembayaran dan navigasi
  const handlePayment = () => {
    if (!selectedMethod) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    // Tentukan tujuan berdasarkan tab yang aktif
    const destination = activeTab === "electronic" ? "/QR" : "/VA";

    // Navigasi ke halaman tujuan dengan meneruskan totalPayment
    navigate(destination, { state: { totalPayment } });
  };

  return (
    <div className="opsibayar-page">
      {/* Header */}
      <Header />

      {/* Content */}
      <main>
        <div className="title">
          <h1>Opsi Pembayaran</h1>
        </div>

        <div className="payment-details">
          <div className="total">
            <div className="grid-kiri">
              <h4>Total Tagihan</h4>
              <h2>Pembayaranmu</h2>
            </div>
            <div className="grid-kanan">
              <h4>Rp {totalPayment.toLocaleString()}</h4>
              <h2>Rp {totalPayment.toLocaleString()}</h2>
            </div>
          </div>

          {/* Opsi Pembayaran */}
          <div className="option-group">
            <div className="option">
              <div className="coins-name">
                <h3>AYUNE COINS</h3>
              </div>
              <div className="coins-total">
                <p>Saldo</p>
                <p>3.500</p>
              </div>
              <input
                type="radio"
                name="payment-method"
                value="coins"
                onChange={handleMethodChange}
              />
            </div>

            <div className="tab-container">
              <button
                className={`tab-button ${activeTab === "electronic" ? "active" : ""}`}
                onClick={() => handleTabChange("electronic")}
              >
                Uang Elektronik
              </button>
              <button
                className={`tab-button2 ${activeTab === "bank-transfer" ? "active" : ""}`}
                onClick={() => handleTabChange("bank-transfer")}
              >
                Transfer Bank
              </button>
            </div>

            {/* Konten untuk Tab "Uang Elektronik" */}
            {activeTab === "electronic" && (
              <div id="electronic" className="tab-content active">
                <div className="option">
                  <img src="assets/images/gopay.png" alt="Gopay" />
                  <p>Gopay</p>
                  <input
                    type="radio"
                    name="payment-method"
                    value="gopay"
                    onChange={handleMethodChange}
                  />
                </div>
                <div className="option">
                  <img src="assets/images/spay.png" alt="ShopeePay" />
                  <p>ShopeePay</p>
                  <input
                    type="radio"
                    name="payment-method"
                    value="spay"
                    onChange={handleMethodChange}
                  />
                </div>
                <div className="option">
                  <img src="assets/images/ovo.png" alt="OVO" />
                  <p>OVO</p>
                  <input
                    type="radio"
                    name="payment-method"
                    value="ovo"
                    onChange={handleMethodChange}
                  />
                </div>
                <div className="option">
                  <img src="assets/images/dana.svg" alt="Dana" />
                  <p>Dana</p>
                  <input
                    type="radio"
                    name="payment-method"
                    value="dana"
                    onChange={handleMethodChange}
                  />
                </div>
              </div>
            )}

            {/* Konten untuk Tab "Transfer Bank" */}
            {activeTab === "bank-transfer" && (
              <div id="bank-transfer" className="tab-content active">
                <div className="option">
                  <img src="assets/images/bca.png" alt="BCA" />
                  <p>BCA</p>
                  <input
                    type="radio"
                    name="payment-method"
                    value="bca"
                    onChange={handleMethodChange}
                  />
                </div>
                <div className="option">
                  <img src="assets/images/bri.png" alt="BRI" />
                  <p>BRI</p>
                  <input
                    type="radio"
                    name="payment-method"
                    value="bri"
                    onChange={handleMethodChange}
                  />
                </div>
                <div className="option">
                  <img src="assets/images/bni.png" alt="BNI" />
                  <p>BNI</p>
                  <input
                    type="radio"
                    name="payment-method"
                    value="bni"
                    onChange={handleMethodChange}
                  />
                </div>
                <div className="option">
                  <img src="assets/images/mandiri.png" alt="Mandiri" />
                  <p>Mandiri</p>
                  <input
                    type="radio"
                    name="payment-method"
                    value="mandiri"
                    onChange={handleMethodChange}
                  />
                </div>
              </div>
            )}

            {/* Tombol Bayar */}
            <button className="pay-button" onClick={handlePayment}>
              Bayar
            </button>
          </div>
        </div>
      </main>

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OpsiBayar;
