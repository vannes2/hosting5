import React from 'react';
import { Link } from 'react-router-dom';
import Header from "./components/HeaderBeforeLogin";
import Footer from "./components/Footer";
import './file_css/aboutus.css';

const AboutUs = () => {
  return (
    <div className="about-page-container">
      {/* header */}
      <Header />

      <main>
        <section>
          <div className="about-us">
            <h1>Tentang Kami</h1>
          </div>
          <div className="content-aboutus">
            <p>
              Ayune hadir sebagai platform konsultasi skincare yang didedikasikan
              untuk membantu Anda memahami kebutuhan kulit dengan lebih baik. 
              Didirikan pada tahun 2024, kami berkomitmen untuk memberikan
              panduan profesional dan personal dari para ahli dermatologi berpengalaman,
              khususnya bagi mereka yang masih awam di dunia perawatan kulit.
              Dalam setiap sesi konsultasi, Anda akan didampingi oleh dokter kulit 
              yang memiliki pengetahuan mendalam tentang berbagai masalah kulit, mulai
              dari jerawat, hiperpigmentasi, penuaan dini, hingga perawatan kulit 
              sehari-hari. Kami memahami bahwa setiap jenis kulit memiliki kebutuhan
              yang berbeda, oleh karena itu, solusi yang kami tawarkan selalu
              disesuaikan dengan kondisi dan tujuan perawatan Anda.
              Kami percaya bahwa kulit sehat adalah investasi jangka panjang, dan kami
              hadir untuk membantu Anda menemukan produk dan rutinitas perawatan
              yang tepat.
            </p>
          </div>
          <div className="content-welcome">
            <p>Selamat datang di Ayune, tempat di mana perjalanan kulit sehat Anda dimulai!</p>
          </div>
        </section>
      </main>

      <div className="footer-separator"></div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
