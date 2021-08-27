import { setupAuthHeaderForServiceCalls } from "./setupHeaders";
import { actions } from "./actions";
const logout = (callback, navigate) => {
  const { REMOVE_USER_CREDENTIALS } = actions;
  localStorage?.removeItem("vtk");
  callback({ type: REMOVE_USER_CREDENTIALS });
  setupAuthHeaderForServiceCalls(null);
  navigate("/login");
};

export { logout };
