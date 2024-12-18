import React from "react";
import logo from "/assets/images/logobesar.svg";

const FooterDokter = () => {
  return (
    <footer
      style={{
        backgroundColor: "#F4F4F4",
        padding: "20px",
        fontSize: "13px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo}
          alt="Logo Ayunne"
          style={{
            height: "40px",
          }}
        />
      </div>

      {/* Contact Information */}
      <div style={{ textAlign: "center", lineHeight: "1.5", color: "#333" }}>
        <p style={{ margin: "5px 0" }}>
          WhatsApp:{" "}
          <a
            href="tel:+6285165644356"
            style={{ color: "#0066CC", textDecoration: "none" }}
          >
            +62-851-6564-4356
          </a>
        </p>
        <p style={{ margin: "5px 0" }}>
          Email:{" "}
          <a
            href="mailto:ayunneconsultation@gmail.com"
            style={{ color: "#0066CC", textDecoration: "none" }}
          >
            ayunneconsultation@gmail.com
          </a>
        </p>
      </div>

      {/* Social Media Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="assets/images/instagram.png"
            alt="Instagram"
            style={{ height: "24px" }}
          />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="assets/images/twt.png"
            alt="Twitter"
            style={{ height: "24px" }}
          />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="assets/images/yt.png"
            alt="YouTube"
            style={{ height: "24px" }}
          />
        </a>
      </div>
    </footer>
  );
};

export default FooterDokter;