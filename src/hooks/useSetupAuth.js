import { useNavigate } from "react-router";

import { useToast } from "../contexts";
import { setupAuthHeaderForServiceCalls } from "../utils/setupHeaders";
import { setupAuthExceptionHandler } from "../utils/setupAuthExceptionHandler";
import { actions } from "../utils/actions";

const useSetupAuth = (dispatchAuthData) => {
  const { SET_USER_CREDENTIALS } = actions;
  const { setupToast } = useToast();
  const navigate = useNavigate();
  return ({ token, userID, userName, path }) => {
    console.log({ token, userID, userName });
    if (!token || !userID || !userName) {
      setupToast("you're not logged in");
      navigate("/login");
      return;
    }
    setupAuthHeaderForServiceCalls(token);
    setupAuthExceptionHandler({
      navigate,
      setupToast,
      dispatchAuthData,
    });
    dispatchAuthData({
      type: SET_USER_CREDENTIALS,
      payload: { token, userID, userName },
    });
    navigate(path || "/");
  };
};

export { useSetupAuth };
