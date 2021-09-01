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
  SET_MANUFACTURERS,
} = actions;

const appDataReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      return {
        ...state,
        productsData: state.productsData.map((product) => {
          if (product._id === payload.product._id) {
            return { ...product, availableQuantity: payload.availableQuantity };
          }
          return product;
        }),
        cartData:
          payload.availableQuantity > -1
            ? state.cartData.concat(payload.product)
            : state.cartData,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        productsData: state.productsData.map((product) => {
          if (product._id === payload.product) {
            return { ...product, availableQuantity: payload.availableQuantity };
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
      return {
        ...state,
        productsData: state.productsData.map((product) => {
          if (product._id === payload.product) {
            return { ...product, availableQuantity: payload.availableQuantity };
          }
          return product;
        }),
        cartData: state.cartData.map((product) => {
          if (product._id === payload.product) {
            return {
              ...product,
              quantity:
                payload.availableQuantity > -1
                  ? product.quantity + 1
                  : product.quantity,
            };
          }
          return product;
        }),
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        productsData: state.productsData.map((product) => {
          if (product._id === payload.product) {
            return { ...product, availableQuantity: payload.availableQuantity };
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
    case SET_MANUFACTURERS:
      return {
        ...state,
        manufacturers: payload.manufacturers,
      };
    case REMOVE_USER_DATA:
      return { ...state, cartData: [], wishListData: [] };
    default:
      return state;
  }
};
export { appDataReducer };
