import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./file_css/ChatPage.css";
import Header from "./components/HeaderDokter";
import FooterDokter from "./components/FooterDokter";

const socket = io("http://localhost:5000"); // Hubungkan ke backend di port 5000

const PasienKonsul = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Pesan diterima di PasienKonsul:", message); // Log diterima
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msg = { sender: "pasien", text: message };
      console.log("Mengirim pesan dari PasienKonsul:", msg); // Log pengiriman
      socket.emit("message", msg);
      setMessage(""); // Kosongkan input setelah mengirim pesan
    }
  };

  return (
    <div className="chat-page">
      {/* header */}
      <Header />

      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form className="message-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Ketik pesan anda..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Kirim</button>
      </form>

      <div className="footer-separator"></div>
      {/* Footer Dokter*/}
      <FooterDokter />
    </div>
  );
};

export default PasienKonsul;
