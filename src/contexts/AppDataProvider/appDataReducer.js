import { actions } from "../../utils/actions";

const {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
  SET_PRODUCTS_DATA,
  SET_CART,
  SET_WISHLIST,
  REMOVE_USER_DATA,
} = actions;
const appDataReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartData: state.cartData.concat(payload),
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishListData: state.wishListData.concat(payload),
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishListData: state.wishListData.filter(
          (product) => product._id !== payload
        ),
      };
    case SET_PRODUCTS_DATA:
      return {
        ...state,
        productsData: payload.products,
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cartData: payload.products,
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        cartData: payload.products,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartData: state.cartData.filter((product) => product._id !== payload),
      };
    case SET_CART:
      return {
        ...state,
        cartData: payload.cart,
      };
    case SET_WISHLIST:
      return {
        ...state,
        wishListData: payload.wishlist,
      };
    case REMOVE_USER_DATA:
      console.log("at remove user data reducer");
      return { ...state, cartData: [], wishListData: [] };
    default:
      return state;
  }
};
export { appDataReducer };
