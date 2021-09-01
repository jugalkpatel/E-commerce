import React, { useState } from "react";

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
  const { setupToast } = useToast();

  const validate =
    type === "LOGIN" ? validatLoginCredentials : validateSignUpCredentials;

  const url = type === "LOGIN" ? "/user/login" : "/user/signup";

  const onButtonClick = async () => {
    setLoading(true);

    if (!validate(payload)) {
      setLoading(false);
      setupToast("Invalid Credentials....");
      return;
    }

    const { data, status } = await postAPI(url, payload);

    console.log({ data, status });

    if (status === 201) {
      const { token, userID, userName } = data;
      localStorage?.setItem("vtk", JSON.stringify({ token, userID, userName }));
      setLoading(false);
      setupAuth({ token, userID, userName, path });
      return;
    }

    if (status === 401) {
      setupToast("Invalid email or password....");
    } else {
      setupToast("something went wrong....");
    }

    setLoading(false);
  };

  return (
    <button
      className={btnClass}
      onClick={!loading ? () => onButtonClick() : null}
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
