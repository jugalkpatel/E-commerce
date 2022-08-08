import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "react-loader-spinner";

import { useAuthData, useToast } from "../../contexts";
import { postAPI } from "../../utils/postAPI";
import { useSetupAuth } from "../../hooks/useSetupAuth";
import {
  validatLoginCredentials,
  validateSignUpCredentials,
} from "../../utils/validateCredentials";
const AuthButton = ({ data }) => {
  const { type, btnText, btnClass, payload, path } = data;
  const { dispatchAuthData } = useAuthData();
  const [loading, setLoading] = useState(false);
  const setupAuth = useSetupAuth(dispatchAuthData);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const validate =
    type === "LOGIN" ? validatLoginCredentials : validateSignUpCredentials;

  const url = type === "LOGIN" ? "/user/login" : "/user/signup";

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const register = useCallback(async () => {
    setLoading(true);

    if (!validate(payload)) {
      setLoading(false);
      addToast("invalid credentials", "error");
      return;
    }

    const { data, status } = await postAPI(url, payload);

    if (status === 201) {
      const { token, userID, userName } = data;
      localStorage?.setItem("vtk", JSON.stringify({ token, userID, userName }));
      setLoading(false);
      setupAuth({ token, userID, userName, path });
      navigate("/");
      return;
    }

    if (status === 404) {
      // setupToast("User not found!");
      addToast("User not found!", "error");
    } else if (status === 401) {
      // setupToast("Invalid email or password");
      addToast("Invalid email or password", "error");
    } else {
      addToast("Something went wrong", "error");
      // setupToast("something went wrong...");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (data.loginAsUser) {
      register();
    }
  }, [data.loginAsUser, register]);

  // const onButtonClick =
  return (
    <button className={btnClass} onClick={!loading ? () => register() : null}>
      {loading ? (
        <Loader type="Bars" color="#fff" width={16} height={16} />
      ) : (
        btnText
      )}
    </button>
  );
};

export { AuthButton };
