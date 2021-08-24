import { actions } from "../../utils/actions";
const loginReducer = (state, { type, payload }) => {
  const { SET_EMAIL, SET_PASSWORD, SHOW_PASSWORD } = actions;
  switch (type) {
    case SET_EMAIL:
      return { ...state, email: payload.data };
    case SET_PASSWORD:
      return { ...state, password: payload.data };
    case SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword };
    default:
      return state;
  }
};

export { loginReducer };
