import React from "react";

import "./Toast.css";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { useToast } from "../../contexts";

const Toast = () => {
  const { showToast, toastMsg, setShowToast } = useToast();
  return (
    <div className={`toast ${showToast ? "visible" : "hidden"}`}>
      <span className="toast__icon">
        <RiErrorWarningFill />
      </span>
      <p className="toast__message">{toastMsg}</p>
      <button className="toast__button" onClick={() => setShowToast(false)}>
        <span className="toast__icon">
          <IoMdClose />
        </span>
      </button>
    </div>
  );
};

export { Toast };
