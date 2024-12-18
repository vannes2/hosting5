import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const ProdukList = () => {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produk")
      .then((response) => {
        setProduk(response.data);
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

  const filteredProduk = produk.filter((item) => {
    const namaProduk = item.nama_produk || "";
    const deskripsiProduk = item.deskripsi || "";
    return (
      namaProduk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deskripsiProduk.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const jenisMap = {
    1: "Pembersih",
    2: "Pelembab",
    3: "Toner",
    4: "Serum",
    5: "Tabir Surya",
    6: "Masker",
  };

  const groupedProduk = filteredProduk.reduce((acc, item) => {
    const jenis = item.id_jenis || "Tidak Terdefinisi";
    const jenisNama = jenisMap[jenis] || "Tidak Terdefinisi";
    if (!acc[jenisNama]) {
      acc[jenisNama] = [];
    }
    acc[jenisNama].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-[30px] bg-white">
      <section className="bg-[#E3F2ED] py-[5px] w-full">
        <div className="flex gap-[89px] px-[120px] max-w-screen-xl mx-auto">
          <p className="text-[#4A4A4A] text-[40px] font-bold">PRODUK</p>
          <div className="flex gap-2 items-center bg-white px-[21px] py-[16px] w-full">
            <CiSearch className="font-bold text-3xl" />
            <input
              type="text"
              className="outline-none w-full rounded"
              placeholder="Telusuri produk perawatan kulit Anda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <br></br>
      {Object.keys(groupedProduk).length === 0 ? (
        <p>Tidak ada produk yang sesuai dengan pencarian.</p>
      ) : (
        Object.keys(groupedProduk).map(
          (jenisNama) =>
            groupedProduk[jenisNama].length > 0 && (
              <section key={jenisNama}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#e3f2ed",
                    color: "black",
                    padding: "5px 20px",
                    marginBottom: "20px",
                  }}
                >
                  <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {jenisNama}
                  </h2>
                  <Link
                    to={
                      jenisNama === "Pembersih"
                        ? "/ProdukPembersih"
                        : jenisNama === "Toner"
                        ? "/ProdukToner"
                        : jenisNama === "Pelembab"
                        ? "/ProdukPelembap"
                        : jenisNama === "Tabir Surya"
                        ? "/ProdukSunscreen"
                        : jenisNama === "Serum"
                        ? "/ProdukSerum"
                        : jenisNama === "Masker"
                        ? "/ProdukMasker"
                        : "#"
                    }
                    style={{
                      fontSize: "20px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    Selengkapnya
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-6 px-[120px] py-[51px] bg-white">
                  {groupedProduk[jenisNama].map((item) => (
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
                              height: "180px",
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
            )
        )
      )}
    </div>
  );
};

export default ProdukList;
