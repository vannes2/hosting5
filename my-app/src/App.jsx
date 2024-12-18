import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./file_css/index.css";
import SignUp from "./SignUp.jsx";
import AboutUs from "./AboutUs.jsx";
import HomeAfterLogin from "./HomeAfterLogin.jsx";
import HomeBeforeLogin from "./HomeBeforeLogin.jsx";
import Login from "./Login.jsx";
import AboutUsLogin from "./AboutUsLogin.jsx";
import ForgotPass from "./ForgotPass.jsx";
import ResetPass from "./ResetPass.jsx";
import Profil from "./Profil.jsx";
import Ahli from "./Ahli.jsx";
import OpsiBayar from "./OpsiBayar.jsx";
import RincianBayar from "./RincianBayar.jsx";
import QR from "./QR.jsx";
import VA from "./VA.jsx";
import Consul from "./Consul.jsx";
import UlasanAhli from "./UlasanAhli.jsx";
import Produk from "./Produk.jsx";
import ProdukPembersih from "./ProdukPembersih.jsx";
import DeskripsiProduk from "./DeskripsiProduk.jsx";
import ProdukToner from "./ProdukToner.jsx";
import ProdukPelembap from "./ProdukPelembap.jsx";
import ProdukSerum from "./ProdukSerum.jsx";
import ProdukSunscreen from "./ProdukSunscreen.jsx";
import ProdukMasker from "./ProdukMasker.jsx";
import Recom from "./Recom.jsx";
import DeskripsiProdukRecom from "./DeskripsiProdukRecom.jsx";
import ProfilEdit from "./ProfilEdit.jsx";

import { PaymentProvider } from "./PaymentContext"; // Import PaymentProvider

import Footer from "./components/Footer.jsx";

import HeaderBeforeLogin from "./components/HeaderBeforeLogin.jsx";
import HeaderAfterLogin from "./components/HeaderAfterLogin.jsx";
import LoginAdmin from "./LoginAdmin.jsx";

import DataDokter from "./DataDokter.jsx";
import DataUser from "./DataUser.jsx";
import DataProduk from "./DataProduk.jsx";
import EditDeskripsiProduk from "./EditDeskripsiProduk.jsx";
import Dashboard from "./Dashboard.jsx";
import AdminGuard from "./AdminGuard";
import PasienKonsul from "./PasienKonsul"; // Ditambahkan untuk PasienKonsul

import UlasanProduk from "./UlasanProduk.jsx";
import HeaderDokter from "./components/HeaderDokter.jsx";
import FooterDokter from "./components/FooterDokter.jsx";
import ProdukList from "./components/produkList.jsx";
import ProdukListRecom from "./components/ProdukListRecom.jsx";
import Datadeskripsiproduk from "./DataDeskripsiProduk.jsx";

const App = () => {
  // Simulasi data user yang sudah login
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
  });

  return (
    <div>
      <PaymentProvider>
        <Routes>
          <Route path="/" element={<HomeBeforeLogin />} />{" "}
          {/* Set this as the main page */}
          <Route path="/Ahli" element={<Ahli />} />
          <Route path="/HomeAfterLogin" element={<HomeAfterLogin />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/AboutUsLogin" element={<AboutUsLogin />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profil" element={<Profil user={user} />} />{" "}
          {/* Data user diteruskan ke komponen Profil */}
          <Route path="/Produk" element={<Produk />} />
          <Route path="/ProdukToner" element={<ProdukToner />} />
          <Route path="/ProdukPelembap" element={<ProdukPelembap />} />
          <Route path="/ProdukSerum" element={<ProdukSerum />} />
          <Route path="/ProdukSunscreen" element={<ProdukSunscreen />} />
          <Route path="/ProdukMasker" element={<ProdukMasker />} />
          <Route path="/ProdukPembersih" element={<ProdukPembersih />} />


          {/*===============================================================================================  */}
          <Route path="/produk/:id" element={<DeskripsiProduk />} />
          {/*===============================================================================================  */}


          <Route path="/ResetPass" element={<ResetPass />} />{" "}
          {/* Use uppercase component name */}
          <Route path="/ForgotPass" element={<ForgotPass />} />{" "}
          {/* Use uppercase component name */}
          <Route path="/OpsiBayar" element={<OpsiBayar />} />
          <Route path="/RincianBayar" element={<RincianBayar />} />
          <Route path="/QR" element={<QR />} />
          <Route path="/VA" element={<VA />} />
          <Route path="/Consul" element={<Consul />} />
          <Route path="/UlasanAhli" element={<UlasanAhli />} />
          <Route path="/Recom" element={<Recom />} />
          <Route
            path="/DeskripsiProdukRecom"
            element={<DeskripsiProdukRecom />}
          />
          <Route path="/ProfilEdit" element={<ProfilEdit />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/HeaderBeforeLogin" element={<HeaderBeforeLogin />} />
          <Route path="/HeaderAfterLogin" element={<HeaderAfterLogin />} />
          <Route path="/LoginAdmin" element={<LoginAdmin />} />
          <Route path="/UlasanProduk" element={<UlasanProduk />} />
          <Route path="/HeaderDokter" element={<HeaderDokter />} />
          <Route path="/FooterDokter" element={<FooterDokter />} />
          <Route path="/ProdukList" element={<ProdukList />} />
          <Route path="/ProdukListRecom" element={<ProdukListRecom />} />
          <Route
            path="/DataDokter"
            element={
              <AdminGuard>
                <DataDokter />
              </AdminGuard>
            }
          />
          <Route
            path="/Datauser"
            element={
              <AdminGuard>
                <DataUser />
              </AdminGuard>
            }
          />
          <Route
            path="/DataProduk"
            element={
              <AdminGuard>
                <DataProduk />
              </AdminGuard>
            }
          />
          <Route
            path="/EditDeskripsiProduk/:id"
            element={
              <AdminGuard>
                <EditDeskripsiProduk />
              </AdminGuard>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <AdminGuard>
                <Dashboard />
              </AdminGuard>
            }
          />
          <Route
            path="/Datadeskripsiproduk"
            element={
              <AdminGuard>
                <Datadeskripsiproduk />
              </AdminGuard>
            }
          />
          {/* Tambahkan rute untuk PasienKonsul */}
          <Route path="/pasienkonsul" element={<PasienKonsul />} />
          {/* Rute fallback untuk 404 */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </PaymentProvider>
    </div>
  );
};

export default App;
