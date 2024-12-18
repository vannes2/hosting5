import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const reviews = [
  {
    name: "Mirana Bella",
    date: "10/10/2024",
    rating: 4,
    age: 28,
    skinType: "Kering",
    skinProblem: "Sangat Kering",
    comment: "Busanya banyak dan lembut bgt jd bikin mood buat cuci muka...",
  },
  {
    name: "Ariana Joe",
    date: "01/10/2024",
    rating: 5,
    age: 19,
    skinType: "Kering",
    skinProblem: "Sensitif",
    comment: "Bikin cerahan banget, jerawat yg aktif dan meradang jd kempes...",
  },
  {
    name: "Sandrina",
    date: "27/09/2024",
    rating: 5,
    age: 19,
    skinType: "Kombinasi",
    skinProblem: "Bruntusan",
    comment: "Facial foam dari Senka yang ada kandungan mixed berries...",
  },
];

const DeskripsiProduk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const [produk, setProduk] = useState(null);

  const handleModal = (action) => {
    if (action === "mengerti") {
      navigate("/UlasanProduk");
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/produk/${id}`) // Gunakan backticks
      .then((response) => {
        setProduk(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]); // id harus masuk dalam array dependensi

  if (!produk) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Header */}
      <Header />

      <section className="bg-[#E3F2ED] py-[5px]">
        <div className="flex gap-[89px] px-[120px] justify-center">
          <p className="text-[#4A4A4A] text-[40px] font-bold">PRODUK</p>
        </div>
      </section>

      {/* Section: Detail Produk */}
      <section>
        <div className="grid grid-cols-2 gap-y-[10px] px-[130px] py-[40px] bg-white">
          <div>
            <div className="flex items-center justify-center">
              <img src={produk.gambar} alt="SENKA" />
            </div>
            <p className="text-center font-bold text-[#3B3B3B] text-[20px]">
              Kisaran Harga
            </p>
            <p className="text-center text-[12px]">{produk.kisaran_harga}</p>
          </div>
          <div className="space-y-[21px]">
            <div className="text-[#3B3B3B]">
              <p className="text-[40px]">{produk.nama_produk}</p>
            </div>
            <div className="text-[#3B3B3B]">
              <p className="font-bold text-[24px]">Deskripsi</p>
              <p className="text-[16px] text-justify">{produk.deskripsi}</p>
            </div>
            <div className="text-[#3B3B3B]">
              <p className="font-bold text-[24px]">Komposisi</p>
              <p className="text-[16px] text-justify">{produk.komposisi}</p>
            </div>
            <div className="text-[#3B3B3B]">
              <p className="font-bold text-[24px]">Cara Pemakaian</p>
              <ol>
                <li>{produk.cara_pemakaian}</li>
              </ol>
            </div>
            <div className="text-[#3B3B3B]">
              <p className="font-bold text-[24px]">Link Pembelian</p>
              <div className="flex items-center justify-start gap-[8px]">
                <Link to={produk.link_shopee}>
                  <img
                    className="w-[76px] h-[76px]"
                    src="/assets/images/shopee.png"
                    alt="shopee"
                  />
                </Link>
                <Link to={produk.link_tokopedia}>
                  <img
                    className="w-[66px] h-[66px]"
                    src="/assets/images/tokopedia.png"
                    alt="tokopedia"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#E3F2ED] py-[21px] flex justify-center relative ml-[500px]">
        <div className=" px-[120px] justify-center">
          <p className="text-[#4A4A4A] text-[20px] font-bold text-center mb-[5px]">
            Ulasan
          </p>
          <div className="flex gap-[10px] items-center justify-center">
            <div className="flex gap-[4.34px] items-center mb-[10px]">
              <img src="/assets/images/1b.png" alt="1b" />
              <img src="/assets/images/2b.png" alt="2b" />
              <img src="/assets/images/3b.png" alt="3b" />
              <img src="/assets/images/4b.png" alt="4b" />
              <img src="/assets/images/5b.png" alt="5b" />
            </div>
            <p className="font-bold text-[24.24px]">4.7 / 5</p>
          </div>
        </div>

        <button
          className="flex items-center justify-center bg-[#147A63] text-white font-bold rounded-full h-[37px] w-[200px] text-[20px] ml-[250px] mt-5"
          onClick={() => setIsModalOpen(true)}
        >
          Berikan Ulasan
        </button>
      </section>

      {/* Section: Ulasan */}
      <section className="ulas bg-white">
        {/* ulasan 1 */}
        <div className="review-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-left">
                <h3 className="review-name">{review.name}</h3>
                <p className="review-date">{review.date}</p>
                <div className="review-rating">
                  {"★".repeat(review.rating)}{" "}
                  <span className="empty-stars">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>
              </div>
              <div className="review-center">
                <p>
                  <strong>Umur:</strong> {review.age}
                </p>
                <p>
                  <strong>Tipe Kulit:</strong> {review.skinType}
                </p>
                <p>
                  <strong>Masalah Kulit:</strong> {review.skinProblem}
                </p>
              </div>
              <div className="review-right">
                <p className="review-comment">{review.comment}</p>
              </div>
            </div>
          ))}
          {/* swipe */}
          <div className="flex items-center justify-center gap-[17px]">
            <FaChevronLeft className="text-xl" />
            <div className="flex gap-[7px]">
              <p className="flex items-center justify-center rounded-full bg-[#147A63] text-white text-[24px] w-[50px] h-[50px] font-bold">
                1
              </p>
            </div>
            <FaChevronRight className="text-xl" />
          </div>
        </div>
      </section>

      <div className="profile-page">
        {/* popup */}
        {isModalOpen && (
          <div className="popup-overlay">
            <div className="popup-content-ulas">
              <h3 className="popup-header">
                Simpan ulasan anda dan dapatkan koin
              </h3>
              <div className="posisi">
                <p>
                  <strong>Pastikan keaslian ulasan anda</strong>
                  <br />
                  Pada saat menulis ulasan diharapkan user menulis berdasarkan
                  pengalaman pribadi.
                </p>
                <p>
                  <strong>Ulas sesuai dengan produk</strong>
                  <br />
                  Pastikan ulasan kamu relevan dan hanya berfokus pada produk
                  yang sedang dikomentari.
                </p>
                <p>
                  <strong>Sopan dan tidak SARA</strong>
                  <br />
                  Gunakan bahasa yang sopan dan hindari konten yang mengandung
                  unsur SARA (Suku, Agama, Ras, dan Antargolongan).
                </p>
                <p>
                  <strong>Ada ulasan yang mengganggu?</strong>
                  <br />
                  Bagian ini memungkinkan kamu untuk melaporkan ulasan yang
                  mungkin tidak pantas atau melanggar aturan.
                </p>
              </div>
              <div className="popup-button-container">
                <button
                  className="popup-button btn-cancel"
                  onClick={() => handleModal("batal")}
                >
                  Batal
                </button>
                <button
                  className="popup-button btn-exit"
                  onClick={() => handleModal("mengerti")}
                >
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DeskripsiProduk;
