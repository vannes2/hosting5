import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";

const ProdukPembersih = () => {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data dari API
    axios
      .get("http://localhost:5000/api/produk")
      .then((response) => {
        // Filter hanya produk dengan id_jenis = 1
        const filteredProduk = response.data.filter(
          (item) => item.id_jenis === 1
        );
        setProduk(filteredProduk);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (produk.length === 0) {
    return <p>Tidak ada produk pembersih yang ditemukan.</p>;
  }

  return (
    <div>
      {/* Header */}
      <Header />

      <div className="space-y-[30px] bg-white">
        <section className="bg-[#E3F2ED] py-[5px]">
          <div className="flex gap-[89px] px-[120px] justify-center">
            <p className="text-[#4A4A4A] text-[40px] font-bold">PRODUK</p>
          </div>
        </section>

        {/* Section Produk Pembersih */}
        <section>
          <div className="flex justify-center px-[120px] py-[6px] bg-[#E3F2ED]">
            <p className="text-[#4A4A4A] text-[24px] font-bold">Pembersih</p>
          </div>
          <div className="grid grid-cols-4 gap-6 px-[120px] py-[51px] bg-white">
            {produk.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "20px",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="flex justify-center">
                  <Link to={`/produk/${item.id}`}>
                    <img
                      src={item.gambar}
                      alt={item.nama_produk || "Produk"}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = "/assets/images/default.png";
                      }}
                    />
                  </Link>
                </div>

                <div className="text-[#4A4A4A] text-[12px]">
                  <p className="text-[#147A63] font-extrabold">
                    {item.nama_brand}
                  </p>
                  <p>{item.nama_produk}</p>
                  <p>{item.kisaran_harga}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProdukPembersih;
