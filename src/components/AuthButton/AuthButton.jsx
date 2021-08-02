import React, { useState } from "react";

import Loader from "react-loader-spinner";

import { useAuthData, useToast } from "../../contexts";
import { postAPI } from "../../utils/postAPI";
import {
  validatLoginCredentials,
  validateSignUpCredentials,
} from "../../utils/validateCredentials";

const AuthButton = ({ data }) => {
  const { type, btnText, btnClass, payload } = data;
  const [loading, setLoading] = useState(false);
  const { setupAuth } = useAuthData();
  const { setupToast } = useToast();
  const validate =
    type === "LOGIN" ? validatLoginCredentials : validateSignUpCredentials;
  const url = type === "LOGIN" ? "/user/login" : "/user/signup";

  const onButtonClick = async () => {
    setLoading(true);

    if (!validate(payload)) {
      setLoading(false);
      setupToast(true, "Invalid Credentials....");
      return;
    }

    const { data, status } = await postAPI(url, payload);

    console.log({ data, status });

    if (status === 201) {
      const { id, token } = data;
      localStorage?.setItem("vst", JSON.stringify({ token, id }));
      setLoading(false);
      setupAuth(token, id);
      return;
    }

    if (status === 401) {
      setupToast(true, "Invalid email or password....");
    } else {
      setupToast(true, "something went wrong....");
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
