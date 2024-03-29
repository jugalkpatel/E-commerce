import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

import { useAuthData } from "..";
import { actions } from "../../utils/actions";
import { appDataReducer } from "./appDataReducer";
import { useStableSetupToast } from "../../hooks/useStableSetupToast";

const AppContext = createContext();

function AppDataProvider({ children }) {
  const { isLoggedIn, userID, token } = useAuthData();
  const setupToast = useStableSetupToast();

  useEffect(() => {
    (async () => {
      try {
        const { SET_PRODUCTS_DATA, SET_MANUFACTURERS } = actions;
        const { data, status } = await axios.get("/products");

        if (status === 201) {
          dispatchAppData({
            type: SET_PRODUCTS_DATA,
            payload: {
              products: data.products,
            },
          });

          dispatchAppData({
            type: SET_MANUFACTURERS,
            payload: {
              manufacturers: data.manufacturers,
            },
          });
        }
      } catch (error) {
        setupToast("failed to fetch products data");
      }
    })();
  }, [setupToast]);

  useEffect(() => {
    if (!token || !userID || !isLoggedIn) {
      return;
    }
    (async () => {
      const { SET_CART, SET_WISHLIST, REMOVE_USER_DATA } = actions;
      const URLs = [`/user/${userID}/cart`, `/user/${userID}/wishlist`];

      try {
        const requests = URLs.map((URL) => axios.get(URL));
        const [cart, wishlist] = await axios.all(requests);

        if (cart.status === 201) {
          dispatchAppData({
            type: SET_CART,
            payload: { cart: cart.data.products },
          });
        }

        if (wishlist.status === 201) {
          dispatchAppData({
            type: SET_WISHLIST,
            payload: { wishlist: wishlist.data.products },
          });
        }
      } catch (error) {
        setupToast("failed to fetch cart and wishlist details....");
        dispatchAppData({ type: REMOVE_USER_DATA });
      }
    })();
  }, [token, userID, isLoggedIn, setupToast]);

  useEffect(() => {
    if (!isLoggedIn) {
      const { REMOVE_USER_DATA } = actions;
      dispatchAppData({ type: REMOVE_USER_DATA });
    }
  }, [isLoggedIn]);

  const initialAppData = {
    productsData: [],
    manufacturers: [],
    cartData: [],
    wishListData: [],
  };

  const [appData, dispatchAppData] = useReducer(appDataReducer, initialAppData);

  return (
    <AppContext.Provider value={{ ...appData, dispatchAppData }}>
      {children}
    </AppContext.Provider>
  );
}

const useAppData = () => useContext(AppContext);

export { AppDataProvider, useAppData };
