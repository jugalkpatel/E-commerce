import axios from "axios";
import { logout } from "./logout";

const setupAuthExceptionHandler = ({
  navigate,
  setupToast,
  clearUserCredentials,
}) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        setupToast("Token Expired: Please Login Again....");
        logout(clearUserCredentials);
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
};

export { setupAuthExceptionHandler };
