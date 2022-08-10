import React, { useState, useEffect } from "react";

import Loader from "react-loader-spinner";

import { useAuthData, useToast } from "../../contexts";
import { postAPI } from "../../utils/postAPI";
import { useSetupAuth } from "../../hooks/useSetupAuth";
import {
  validatLoginCredentials,
  validateSignUpCredentials,
} from "../../utils/validateCredentials";

const AuthButton = ({ data }) => {
  const { type, btnText, btnClass, payload, path, callback, submitting } = data;
  const { dispatchAuthData } = useAuthData();
  const [loading, setLoading] = useState(false);
  const setupAuth = useSetupAuth(dispatchAuthData);
  const { addToast } = useToast();
  const validate =
    type === "LOGIN" ? validatLoginCredentials : validateSignUpCredentials;

  const url = type === "LOGIN" ? "/user/login" : "/user/signup";

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const submit = async () => {
    setLoading(true);

    if (callback) callback();

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
      return;
    }

    if (status === 404) {
      addToast("User not found!", "error");
    } else if (status === 401) {
      addToast("Invalid email or password", "error");
    } else {
      addToast("Something went wrong", "error");
    }

    setLoading(false);
  };

  return (
    <button
      className={btnClass}
      onClick={!loading ? () => submit() : null}
      disabled={submitting ? true : false}
    >
      {loading ? (
        <Loader type="Bars" color="#fff" width={16} height={16} />
      ) : (
        btnText
      )}
    </button>
  );
};

export { AuthButton };
