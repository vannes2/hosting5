import React, { createContext, useContext, useState } from "react";

// Buat Context
const PaymentContext = createContext();

// Provider untuk membungkus aplikasi
export const PaymentProvider = ({ children }) => {
  const [totalPayment, setTotalPayment] = useState(0); // Default awal Rp0

  return (
    <PaymentContext.Provider value={{ totalPayment, setTotalPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};

// Custom Hook untuk mengakses Context
export const usePayment = () => useContext(PaymentContext);
