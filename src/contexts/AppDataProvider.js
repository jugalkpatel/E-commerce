// import axios from "axios";
import { labels } from "../utils/labels";
import { createContext, useContext, useReducer } from "react";
const AppContext = createContext();

function AppDataProvider({ children }) {

    const {
        ADD_TO_CART,
        ADD_TO_WISHLIST,
        REMOVE_FROM_WISHLIST,
        INCREMENT_QUANTITY,
        DECREMENT_QUANTITY
    } = labels;

    // things to be included
    // post quantity to the server
    // add categories to products
    // show toasts 
    // make styling better(see nvidia website)(https://www.nvidia.com/en-us/geforce/buy/)
    // implement slider(carousal) make mobile friendly(slider contains different companies) 

    const appDataReducer = (prevState, { type, payload }) => {
        switch (type) {
            case ADD_TO_CART:
                return {
                    ...prevState,
                    cartData: [...prevState.cartData, payload.data]
                };
            case ADD_TO_WISHLIST:
                return {
                    ...prevState,
                    wishListData: [...prevState.wishListData, payload.data]
                };
            case REMOVE_FROM_WISHLIST:
                return {
                    ...prevState,
                    wishListData: prevState.wishListData.filter((item) => item.id !== payload.data)
                }
            case "SET_PRODUCT_DATA":
                return {
                    ...prevState,
                    productsData: payload.products,
                    loading: false
                };
            case INCREMENT_QUANTITY:
                return {
                    ...prevState,
                    cartData: prevState.cartData.map((item) => {
                        return (
                            item.id === payload.data
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        );
                    })
                }
            case DECREMENT_QUANTITY:
                return {
                    ...prevState,
                    cartData: prevState.cartData.map((item) => {
                        return (
                            item.id === payload.data
                                ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity }
                                : item
                        )
                    })
                }
            default:
                throw new Error("Action Not Defined");
        }
        return prevState;
    }

    const [appData, dispatchAppData] = useReducer(appDataReducer, {
        cartData: [],
        wishListData: [],
    })



    console.log({ appData });
    return (
        <AppContext.Provider value={{ appData, dispatchAppData }}>
            {children}
        </AppContext.Provider>
    )
}

function useAppData() {
    return useContext(AppContext);
}

export { AppDataProvider, useAppData };