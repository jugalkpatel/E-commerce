import { useToast } from "../contexts";
import { useNavigate } from "react-router";
import { setupAuthHeaderForServiceCalls } from "../utils/setupHeaders";
import { setupAuthExceptionHandler } from "../utils/setupAuthExceptionHandler";
const useSetupAuth = ({
  setToken,
  setLogin,
  setUserID,
  clearUserCredentials,
}) => {
  const { setupToast } = useToast();
  const navigate = useNavigate();
  return (token, id, path) => {
    if (!token || !id) {
      setupToast("you're not logged in");
      navigate("/login");
      return;
    }
    setupAuthHeaderForServiceCalls(token);
    setupAuthExceptionHandler({
      navigate,
      setupToast,
      clearUserCredentials,
    });
    setLogin(true);
    setToken(token);
    setUserID(id);
    navigate(path || "/");
  };
};

export { useSetupAuth };
