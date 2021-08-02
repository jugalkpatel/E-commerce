import React, { useContext, createContext, useState, useEffect } from "react";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    console.log("ToastProvider useEffect called....");
    const timer = setTimeout(() => {
      setShowToast(false);
      setToastMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  });

  const setupToast = (viewToast, message) => {
    setShowToast(viewToast);
    setToastMsg(message);
  };

  return (
    <ToastContext.Provider
      value={{ showToast, toastMsg, setupToast, setShowToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };
