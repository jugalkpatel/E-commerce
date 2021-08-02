import { constants } from "../../utils/constants";
const signUpReducer = (state, { type, payload }) => {
  const {
    SET_EMAIL,
    SET_USER_NAME,
    SET_PASSWORD,
    SET_CONFIRM_PASSWORD,
    RESET_SIGNUP,
    SHOW_PASSWORD,
  } = constants;
  switch (type) {
    case SET_EMAIL:
      return { ...state, email: payload.data };
    case SET_USER_NAME:
      return { ...state, uname: payload.data };
    case SET_PASSWORD:
      return { ...state, password: payload.data };
    case SET_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: payload.data,
        isPasswordsMatching: state.password === payload.data ? true : false,
      };
    case RESET_SIGNUP:
      return { ...state, email: "", uname: "", password: "" };
    case SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
};

export { signUpReducer };
