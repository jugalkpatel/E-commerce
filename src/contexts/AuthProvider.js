import { React, createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useToast } from "./ToastProvider";
import { postAPI } from "../utils/postAPI";
import { setupAuthHeaderForServiceCalls } from "../utils/setupHeaders";
import { prepareUrls } from "../utils/urlList";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const path = state !== null ? state.from : "/";

  const { setupToast } = useToast();

  useEffect(() => {
    console.log("AuthProvider useEffect called....");
    (async () => {
      const { token, id } = (await JSON.parse(
        localStorage?.getItem("verse-token")
      )) || { token: "", id: "" };
      setupAuth(token, id);
    })();
  }, []);

  const setupAuth = (token, id) => {
    if (!token || !id) {
      // TODO: SHOW ERROR TOAST
      setupToast(true, "You're Not Logged In");
      navigate(path);
      return;
    }
    setupAuthHeaderForServiceCalls(token);
    prepareUrls(id);
    setLogin(true);
    setToken(token);
    navigate(path);
  };

  const handleLogin = async ({ email, password }) => {
    if (!email && !password) {
      // TODO: SHOW ERROR TOAST
      setupToast(true, "Please fill all details");
    }

    const response = await postAPI(
      "https://neog-ecommerce--backend.herokuapp.com/user/login",
      {
        email,
        password,
      }
    );

    // TODO: FIND BETTER WAY
    if (response?.data) {
      const { token, id } = response.data;
      // TODO: FIND BETTER WAY
      localStorage?.setItem("verse-token", JSON.stringify({ token, id }));
      setupAuth(token, id);
      return;
    }

    if (response === 401) {
      setupToast(true, "Invalid user name or password");
      return;
    }

    setupToast(true, "Failed to Login try again");
  };

  const handleLogout = () => {
    setToken("");
    setLogin(false);
    localStorage?.removeItem("verse-token");
    setupToast(true, "You're Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLogin,
        handleLogin,
        token,
        handleLogout,
        setupAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthData = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthData };
