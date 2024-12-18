import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const reviews = [ 
  { name: 'Mila S.009',
    date: '22/10/2024',
    rating: 4,
    age: 27,
    skinType: 'Kombinasi',
    skinIssue: 'Sangat kering,Sensitif',
    skinProblem: 'Sangat Kering',
    comment: 'Bagussss.. cocok di kulit. Gentle wash bikin kulit gak kering. Best deh. Cocok untuk semua jenis kulit. Suka banget sama produk ini aku repurchasevterus . Yuk rekomen banget untuk semuanya yang punya kulit sensitif sama produk yang berat' 
  },
  { name: 'Sarah', 
    date: '01/10/2024', 
    rating: 5, 
    age: 16, 
    skinType: 'Kering', 
    skinIssue: 'Sangat kering, Sensitif', 
    skinProblem: 'Sansitif',
    comment: 'Udah 3 tahun selalu pakai cetaphil yg gentle dan sekarang pingin coba yg hydrating foaming semoga cocok dan beneran bagus untuk hydarasi kulit' 
  }, 
  { name: 'Diandrea D.', 
    date: '27/09/2024', 
    rating: 5, 
    age: 23, 
    skinType: 'Kombinasi', 
    skinIssue: 'Sensitif',
    skinProblem: 'Bruntusan',
    comment: 'Aku pemakaian yang ke 3 bulan ini. jujur cocok banget bikin kulit aku lembab after cuci muka. juga ada perubahan kulit aku mendingan sama bruntusan dan jadi cerahan. pokoknya approve!' 
  }, 
];

const DeskripsiProdukRecom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Mengelola modal
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleModal = (action) => {
    if (action === 'mengerti') {
      navigate('/ulasanproduk'); // Navigasi ke halaman ulasan
    }
    setIsModalOpen(false); // Tutup modal
  };

  return (
    <div className="profile-page">
      {/* header */}
      <Header />
      
      <div className='space-y-[30px] bg-white'>
        <section className='bg-[#E3F2ED] py-[5px]'>
          <div className='flex gap-[89px] px-[120px] justify-center'>
            <p className='text-[#4A4A4A] text-[40px] font-bold'>PRODUK</p>
          </div>
        </section>
        {/* Section Detail Produk */}
        <section>
          <div className='grid grid-cols-2 gap-y-[10px] px-[130px] py-[40px] bg-white'>
            <div>
                <div className='flex items-center justify-center'>
                    <img src="/assets/images/cetaphildetail.png" alt="CETAPHIL" />
                </div>
                <p className='text-center font-bold text-[#3B3B3B] text-[20px]'>Kisaran Harga</p>
                <p className='text-center text-[12px]'>Rp155.000 - Rp167.000</p>
            </div>
            <div className='space-y-[21px]'>
                <div className='text-[#3B3B3B]'>
                    <p className='text-[40px]'><span className='font-bold'>CETAPHIL - </span>Hydrating Foaming 
                    Cream Cleanser</p>
                </div>
                <div className='text-[#3B3B3B]'>
                    <p className='font-bold text-[24px]'>Deskripsi</p>
                    <p className='text-[16px] text-justify'>Pembersih krim yang berubah menjadi busa ini membersihkan tanpa membuat kering skin barrier serta sudah teruji secara klinis efektif membersihkan kotoran, minyak, dan riasan. Diformulasikan dengan aloe vera yang menenangkan, glycerin yang menghidrasi, panthenol (pro-vitamin B5), dan niacinamide (vitamin B3), produk ini membuat kulit terasa terhidrasi, lembut, dan halus setelah digunakan. Formulanya juga menjaga lapisan pelindung alami dan pH kulit untuk mengurangi tanda-tanda kulit sensitif.</p>
                </div>
                <div className='text-[#3B3B3B]'>
                    <p className='font-bold text-[24px]'>Komposisi</p>
                    <p className='text-[16px] text-justify'>Aqua, Sodium Cocoyl Isethionate, Glycerin, Glycol Distearate, Sodium Cocoyl Glutamate, Cocamidopropyl Betaine, Sodium Lauroyl Sarcosinate, Cetearyl Alcohol, Niacinamide, Panthenol, Aloe Barbadensis Leaf Juice Powder, Pantolactone, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Arginine, Propylene Glycol, Sodium Chloride, Xanthan Gum, Ethylhexylglycerin, Phenoxyethanol, Citric Acid. FIL.1815.V00</p>
                </div>
                <div className='text-[#3B3B3B]'>
                    <p className='font-bold text-[24px]'>Cara Pemakaian</p>
                    <ol>
                        <li>1. Basahi kulit dan tuangkan pembersih ini ke telapak tangan.</li>
                        <li>2. Usap-usap krim hingga terbentuk busa, tambahkan sedikit air untuk busa yang lebih banyak.</li>
                        <li>3. Pijatkan busa pada kulit secara lembut dengan gerakan memutar. Bilas hingga bersih dan keringkan.</li>
                    </ol>
                </div>
                <div className='text-[#3B3B3B]'>
                    <p className='font-bold text-[24px]'>Link Pembelian</p>
                    <div className='flex items-center justify-start gap-[8px]'>
                        <Link to="https://shopee.co.id/Cetaphil-Hydrating-Foaming-Cream-Cleanser-236ml-i.30736001.29407441865?sp_atk=4946c549-b4eb-4e1d-92d7-1104a4a6e3b5&xptdk=4946c549-b4eb-4e1d-92d7-1104a4a6e3b5"><img className='w-[76px] h-[76px]' src="/assets/images/shopee.png" alt="shopee" /></Link>
                        <Link to="https://www.tokopedia.com/nihonmart/senka-perfect-whip-berry-bright-100g?extParam=ivf%3Dfalse%26keyword%3Dsenka+perfect+whip+berry+bright%26search_id%3D202411231704385EF27DE50DE81D3CA6PW%26src%3Dsearch"><img className='w-[66px] h-[66px]' src="/assets/images/tokopedia.png" alt="tokopedia" /></Link>
                    </div>
                </div>
            </div>
          </div>
        </section>
        <section className='bg-[#E3F2ED] py-[21px] flex justify-center relative'>
          <div className=' px-[120px] justify-center'>
            <p className='text-[#4A4A4A] text-[20px] font-bold text-center mb-[7px]'>Ulasan</p>
            <div className='flex gap-[10px] items-center justify-center'>
                <div className='flex gap-[4.34px] items-center'>
                    <img src="/assets/images/1b.png" alt="1b" />
                    <img src="/assets/images/2b.png" alt="2b" />
                    <img src="/assets/images/3b.png" alt="3b" />
                    <img src="/assets/images/4b.png" alt="4b" />
                    <img src="/assets/images/5b.png" alt="5b" />
                </div>
                <p className='font-bold text-[24.24px]'>4.7 / 5</p>
            </div>
          </div>
          
          <button className='px-[11px] bg-[#147A63] text-white font-bold rounded-full h-[37px] w-[200px] py-[50px] text-[20px] absolute right-[120px] top-[16px]' onClick={() => setIsModalOpen(true)} // Pastikan fungsi ini dipanggil
          >
            Berikan Ulasan
          </button>

        </section>
        {/* kumpulan ulasan */}
        <section className='ulas'>
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
          <div className='flex items-center justify-center gap-[17px]'>
              <FaChevronLeft className='text-xl' />
              <div className='flex gap-[7px]'>
              <p className="flex items-center justify-center rounded-full bg-[#147A63] text-white text-[24px] w-[50px] h-[50px] font-bold">
                1
              </p>
              </div>
              <FaChevronRight className='text-xl' />
            </div>
          </div>
        </section>
      </div>

      {/* popup */}
      {isModalOpen && (
        <div className='popup-overlay'>
          <div className='popup-content-ulas'>
            <h3 className='popup-header'>Simpan ulasan anda dan dapatkan koin</h3>
            <div className='posisi'>
              <p>
                <strong>Pastikan keaslian ulasan anda</strong><br />
                Pada saat menulis ulasan diharapkan user menulis berdasarkan pengalaman pribadi.
              </p>
              <p>
                <strong>Ulas sesuai dengan produk</strong><br />
                Pastikan ulasan kamu relevan dan hanya berfokus pada produk yang sedang dikomentari.
              </p>
              <p>
                <strong>Sopan dan tidak SARA</strong><br />
                Gunakan bahasa yang sopan dan hindari konten yang mengandung unsur SARA (Suku, Agama, Ras, dan Antargolongan).
              </p>
              <p>
                <strong>Ada ulasan yang mengganggu?</strong><br />
                Bagian ini memungkinkan kamu untuk melaporkan ulasan yang mungkin tidak pantas atau melanggar aturan.
              </p>
            </div>
            <div className="popup-button-container">
              <button className='popup-button btn-cancel' onClick={() => handleModal('batal')}>Batal</button>
              <button className='popup-button btn-exit' onClick={() => handleModal('mengerti')}>Mengerti</button>
            </div>
          </div>
        </div>
      )}

    <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default DeskripsiProdukRecom