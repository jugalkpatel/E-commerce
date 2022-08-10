import { actions } from "../../utils/actions";
const loginReducer = (state, { type, payload }) => {
  const { SET_EMAIL, SET_PASSWORD, SHOW_PASSWORD, LOGIN_AS_GUEST } = actions;
  switch (type) {
    case SET_EMAIL:
      return { ...state, email: payload.data };
    case SET_PASSWORD:
      return { ...state, password: payload.data };
    case SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword };
    case LOGIN_AS_GUEST:
      return {
        ...state,
        submitting: true,
        email: process.env.REACT_APP_GUEST_EMAIL,
        password: process.env.REACT_APP_GUEST_PASSWORD,
      };
    default:
      return state;
  }
};

export { loginReducer };
