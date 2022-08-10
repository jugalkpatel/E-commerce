import React, { useEffect } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdClose, IoMdCheckmarkCircleOutline } from "react-icons/io";

import "./Toast.css";

import { useToast } from "../../contexts";

const Toast = ({ id, text, variant }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [removeToast, id]);

  return (
    <div className={`toast ${variant === "success" && "success_variant"}`}>
      <span className="toast__icon">
        {variant === "success" ? (
          <IoMdCheckmarkCircleOutline />
        ) : (
          <RiErrorWarningFill />
        )}
      </span>
      <p className="toast__message">{text}</p>
      <button className="toast__button" onClick={() => removeToast(id)}>
        <span className="toast__icon">
          <IoMdClose />
        </span>
      </button>
    </div>
  );
};

export { Toast };
