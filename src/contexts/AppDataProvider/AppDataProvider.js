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
    if (!token || !userID || !isLoggedIn) {
      return;
    }
    (async () => {
      const { SET_CART, SET_WISHLIST } = actions;
      const URLs = [`/user/${userID}/car`, `/user/${userID}/wishlist`];

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
      }
    })();
  }, [token, userID, isLoggedIn, setupToast]);

  const [appData, dispatchAppData] = useReducer(appDataReducer, {
    productsData: [],
    cartData: [],
    wishListData: [],
  });

  console.log({ appData });

  return (
    <AppContext.Provider value={{ ...appData, dispatchAppData }}>
      {children}
    </AppContext.Provider>
  );
}

const useAppData = () => useContext(AppContext);

export { AppDataProvider, useAppData };
