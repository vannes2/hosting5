import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProdukList = () => {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTipeKulit, setSelectedTipeKulit] = useState("all");
  const [selectedMasalahKulit, setSelectedMasalahKulit] = useState("all");

  useEffect(() => {
    // Fetch data produk dari API
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

  // Filter produk berdasarkan dropdown
  const filteredProduk = produk.filter((item) => {
    const filterTipeKulit =
      selectedTipeKulit === "all" ||
      item.id_tipe_kulit === parseInt(selectedTipeKulit);
    const filterMasalahKulit =
      selectedMasalahKulit === "all" ||
      item.id_masalah === parseInt(selectedMasalahKulit);

    return filterTipeKulit && filterMasalahKulit;
  });

  const jenisMap = {
    1: "Pembersih",
    2: "Pelembab",
    3: "Toner",
    4: "Serum",
    5: "Tabir Surya",
    6: "Masker",
  };

  const tipeKulitOptions = {
    1: "Kering",
    2: "Kombinasi",
    3: "Normal",
    4: "Berminyak",
    5: "Sensitif",
  };

  const masalahKulitOptions = {
    1: "Jerawat & Komedo",
    2: "Penuaan",
    3: "Pigmentasi",
    4: "Tekstur Kulit",
    5: "Kering & Sensitif",
    6: "Berminyak",
    7: "Kehamilan",
    8: "Warna Kulit",
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
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <section className="bg-[#E3F2ED] py-[5px] text-center">
        <p className="text-[#4A4A4A] text-[40px] font-bold">REKOMENDASI</p>
      </section>

      {/* Dropdown filter */}
      <section className="flex justify-center gap-10 px-[120px] py-[20px]">
        <div>
          <label htmlFor="filter-tipe-kulit" className="font-bold">
            Tipe Kulit:
          </label>
          <select
            id="filter-tipe-kulit"
            value={selectedTipeKulit}
            onChange={(e) => setSelectedTipeKulit(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">Semua Tipe Kulit</option>
            {Object.entries(tipeKulitOptions).map(([id, name]) => (
              <option key={id} value={id}>{`${id} - ${name}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-masalah-kulit" className="font-bold">
            Masalah Kulit:
          </label>
          <select
            id="filter-masalah-kulit"
            value={selectedMasalahKulit}
            onChange={(e) => setSelectedMasalahKulit(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">Semua Masalah Kulit</option>
            {Object.entries(masalahKulitOptions).map(([id, name]) => (
              <option key={id} value={id}>{`${id} - ${name}`}</option>
            ))}
          </select>
        </div>
      </section>

      <br />
      {Object.keys(groupedProduk).length === 0 ? (
        <p className="text-center">
          Tidak ada produk yang sesuai dengan filter.
        </p>
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
                    to="#"
                    style={{
                      fontSize: "20px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  ></Link>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                    margin: "0 auto",
                    padding: "0 10px",
                  }}
                ></div>

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
