import {
  React,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import { useSetupAuth } from "../hooks/useSetupAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [token, setToken] = useState("");
  const [userID, setUserID] = useState("");

  const clearUserCredentials = () => {
    setToken("");
    setUserID("");
    setLogin(false);
  };

  const stableSetupAuth = useRef(
    useSetupAuth({ setToken, setLogin, setUserID, clearUserCredentials })
  );

  useEffect(() => {
    console.log("AuthProvider useEffect called....");
    (async () => {
      const setupAuth = stableSetupAuth.current;
      const { token, id } = (await JSON.parse(
        localStorage?.getItem("vtk")
      )) || { token: "", id: "" };

      if (token && id) {
        setupAuth(token, id);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userID,
        setLogin,
        setToken,
        setUserID,
        clearUserCredentials,
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
