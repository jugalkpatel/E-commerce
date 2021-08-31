import React, { useContext, createContext, useState, useEffect } from "react";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
      setToastMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  });

  const setupToast = (message) => {
    setShowToast(true);
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
