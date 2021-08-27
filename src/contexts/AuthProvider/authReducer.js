import { actions } from "../../utils/actions";
const { SET_USER_CREDENTIALS, REMOVE_USER_CREDENTIALS } = actions;

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_USER_CREDENTIALS:
      const { token, userID, userName } = payload;
      return { ...state, isLoggedIn: true, token, userID, userName };
    case REMOVE_USER_CREDENTIALS:
      console.log("in remove user credentials");
      return {
        ...state,
        isLoggedIn: false,
        token: "",
        userID: "",
        userName: "",
      };
    default:
      return state;
  }
};

export { authReducer };
