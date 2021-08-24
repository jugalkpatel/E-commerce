import { setupAuthHeaderForServiceCalls } from "./setupHeaders";

const logout = (callback) => {
  localStorage?.removeItem("vtk");
  callback();
  setupAuthHeaderForServiceCalls(null);
};

export { logout };
