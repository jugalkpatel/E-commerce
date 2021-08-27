import { actions } from "../../utils/actions";

const {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
  SET_PRODUCTS_DATA,
  SET_CART,
  SET_WISHLIST,
  REMOVE_USER_DATA,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} = actions;

const appDataReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        productsData: state.productsData.map((product) => {
          if (product._id === payload.product._id) {
            return { ...product, quantity: payload.totalQuantity };
          }
          return product;
        }),
        cartData: state.cartData.concat(payload.product),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        productsData: state.productsData.map((product) => {
          if (product._id === payload.product) {
            return { ...product, quantity: payload.totalQuantity };
          }
          return product;
        }),
        cartData: state.cartData.filter(
          (product) => product._id !== payload.product
        ),
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
    case INCREMENT_QUANTITY:
      console.log({ payload });
      return {
        ...state,
        productsData: state.productsData.map((product) => {
          if (product._id === payload.product) {
            return { ...product, quantity: payload.totalQuantity };
          }
          return product;
        }),
        cartData: state.cartData.map((product) => {
          if (product._id === payload.product) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        }),
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        productsData: state.productsData.map((product) => {
          if (product._id === payload.product) {
            return { ...product, quantity: payload.totalQuantity };
          }
          return product;
        }),
        cartData: state.cartData.map((product) => {
          if (product._id === payload.product) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        }),
      };
    case SET_PRODUCTS_DATA:
      return {
        ...state,
        productsData: payload.products,
      };
    // case SET_QUANTITY:
    //   return {
    //     ...state,
    //     cartData: state.cartData.map((product) => {
    //       if (product._id === payload.product) {
    //         return { ...product, quantity:  };
    //       }
    //       return product;
    //     }),
    //   };
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
      return { ...state, cartData: [], wishListData: [] };
    default:
      return state;
  }
};
export { appDataReducer };
