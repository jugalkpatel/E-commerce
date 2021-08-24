import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuthData, useToast } from "..";
import { postAPI } from "../../utils/postAPI";
import { actions } from "../../utils/actions";
import { appDataReducer } from "./appDataReducer";

const AppContext = createContext();

function AppDataProvider({ children }) {
  const navigate = useNavigate();

  const { isLoggedIn, userID, token } = useAuthData();

  const { setupToast } = useToast();

  useEffect(() => {
    console.log("AppProvider useEffect called");

    const { SET_CART, SET_WISHLIST } = actions;
    if (!token || !userID || !isLoggedIn) {
      return;
    }
    (async () => {
      const URLs = [`/user/${userID}/cart`, `/user/${userID}/wishlist`];

      console.log({ URLs });

      try {
        const requests = URLs.map((URL) => axios.get(URL));
        const [cart, wishlist] = await axios.all(requests);

        console.log({ cart, wishlist });

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
        console.log(error);
        setupToast("Operation failed");
      }
    })();
  }, [token, userID, isLoggedIn]);

  const handleAPIOperations = async (url, postData, callback, action) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/" } });
      return;
    }

    const response = await postAPI(url, postData);

    if (typeof response === "number") {
      setupToast(`${response} operation failed`);
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

  console.log({ appData });

  return (
    <AppContext.Provider
      value={{ ...appData, dispatchAppData, handleAPIOperations }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppData = () => useContext(AppContext);

export { AppDataProvider, useAppData };
