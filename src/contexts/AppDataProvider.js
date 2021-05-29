import React from 'react';
import axios from 'axios';
import { labels } from '../utils/labels';
import { createContext, useContext, useReducer, useEffect } from 'react';
const AppContext = createContext();

function AppDataProvider({ children }) {
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
  } = labels;

  const appDataReducer = (prevState, { type, payload }) => {
    switch (type) {
      case ADD_TO_CART:
        return {
          ...prevState,
          cartData: payload.products,
        };
      case ADD_TO_WISHLIST:
        return {
          ...prevState,
          wishListData: payload.products,
        };
      case REMOVE_FROM_WISHLIST:
        return {
          ...prevState,
          wishListData: payload.products,
        };
      case SET_PRODUCTS_DATA:
        return {
          ...prevState,
          productsData: payload.products,
        };
      case INCREMENT_QUANTITY:
        return {
          ...prevState,
          cartData: payload.products,
        };
      case DECREMENT_QUANTITY:
        return {
          ...prevState,
          cartData: payload.products,
        };
      case REMOVE_FROM_CART:
        return {
          ...prevState,
          cartData: payload.products,
        };
      case SET_CART:
        return {
          ...prevState,
          cartData: payload.cart,
          wishListData: payload.wishlist,
        };
      case SET_WISHLIST:
        return {
          ...prevState,
          wishListData: payload.products,
        };
      default:
        throw new Error('Action Not Defined');
    }
  };

  const [appData, dispatchAppData] = useReducer(appDataReducer, {
    productsData: [],
    cartData: [],
    wishListData: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://neog-ecommerce--backend.herokuapp.com/products'
        );
        if (response.status === 201) {
          dispatchAppData({
            type: SET_PRODUCTS_DATA,
            payload: { products: response.data.products },
          });
          console.log('data is successfully set');
        }
      } catch (error) {
        console.log('failed to fetch data', error);
      }
    })();
  }, []);

  console.log({ appData });

  return (
    <AppContext.Provider value={{ appData, dispatchAppData }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppData() {
  return useContext(AppContext);
}

export { AppDataProvider, useAppData };
