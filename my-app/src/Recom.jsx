import React from "react";
import ProdukListRecom from "./components/ProdukListRecom";
import Header from "./components/HeaderAfterLogin";
import Footer from "./components/Footer";

const Recom = () => {
  return (
    <div>
      <Header />
      <ProdukListRecom />
      <div className="footer-separator"></div>
      <Footer />
    </div>
  );
};

export default Recom;
