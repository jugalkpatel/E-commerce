import axios from "axios";
import { logout } from "./logout";

const setupAuthExceptionHandler = ({
  navigate,
  setupToast,
  dispatchAuthData,
}) => {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        setupToast("Token Expired: Please Login Again....");
        logout(dispatchAuthData, navigate);
      }
      return Promise.reject(error);
    }
  );
};

export { setupAuthExceptionHandler };
