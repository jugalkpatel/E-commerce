import React from 'react';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuthData } from './AuthProvider';
import { useToast } from './ToastProvider';
import { postAPI } from '../utils/postAPI';
import { urlList } from '../utils/urlList';
import { constants } from '../utils/constants';

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
  } = constants;

  const { GET_CART, GET_WISHLIST } = urlList;

  let navigate = useNavigate();

  const { isLoggedIn, token } = useAuthData();

  const { setupToast } = useToast();

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
        };
      case SET_WISHLIST:
        return {
          ...prevState,
          wishListData: payload.wishlist,
        };
      default:
        throw new Error('Action Not Defined');
    }
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      const URLs = [GET_CART, GET_WISHLIST];

      try {
        const requests = URLs.map((URL) => axios.get(URL));
        const [cart, wishlist] = await axios.all(requests);

        if (cart) {
          dispatchAppData({
            type: SET_CART,
            payload: { cart: cart.data.products },
          });
        }

        if (wishlist) {
          dispatchAppData({
            type: SET_WISHLIST,
            payload: { wishlist: wishlist.data.products },
          });
        }
      } catch (error) {
        if (error?.response && error.response.status === 401) {
          setupToast(true, 'Session Expired Please Login Again');
          navigate('/login');
          return;
        }

        setupToast(true, 'Operation failed');
      }
    })();
  }, [token]);

  const handleAPIOperations = async (url, postData, callback, action) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    const response = await postAPI(url, postData);

    if (typeof response === 'number') {
      setupToast(true, `${response} operation failed`);
      return;
    }
    const { data } = response;
    callback({ type: action, payload: data });
  };

  const [appData, dispatchAppData] = useReducer(appDataReducer, {
    productsData: [],
    cartData: [],
    wishListData: [],
  });

  return (
    <AppContext.Provider
      value={{ appData, dispatchAppData, handleAPIOperations }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppData = () => useContext(AppContext);

export { AppDataProvider, useAppData };
