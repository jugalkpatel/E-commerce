import {
  React,
  createContext,
  useContext,
  useEffect,
  useRef,
  useReducer,
} from "react";

import { useSetupAuth } from "../../hooks/useSetupAuth";
import { authReducer } from "./authReducer";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialAuthData = {
    isLoggedIn: false,
    token: "",
    userID: "",
    userName: "",
  };

  const [authData, dispatchAuthData] = useReducer(authReducer, initialAuthData);

  const stableSetupAuth = useRef(useSetupAuth(dispatchAuthData));

  useEffect(() => {
    console.log("AuthProvider useEffect called....");
    (async () => {
      const setupAuth = stableSetupAuth.current;
      const { token, userID, userName } = (await JSON.parse(
        localStorage?.getItem("vtk")
      )) || { token: "", id: "", userName: "" };

      if (token && userID && userName) {
        setupAuth({ token, userID, userName });
      }
    })();
  }, []);

  console.log({ authData });

  return (
    <AuthContext.Provider
      value={{
        ...authData,
        dispatchAuthData,
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
