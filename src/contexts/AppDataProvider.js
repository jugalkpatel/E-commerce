import axios from "axios";
import { labels } from "../utils/labels";
import { createContext, useContext, useReducer, useEffect } from "react";
const AppContext = createContext();

function AppDataProvider({ children }) {


    const {
        ADD_TO_CART,
        ADD_TO_WISHLIST,
        INCREMENT_QUANTITY,
        DECREMENT_QUANTITY,
        REMOVE_FROM_CART,
        REMOVE_FROM_WISHLIST,
        SET_DATA
    } = labels;


    const appDataReducer = (prevState, { type, payload }) => {
        switch (type) {
            case ADD_TO_CART:
                console.log({ payload })
                return {
                    ...prevState,
                    cartData: payload
                }
            case ADD_TO_WISHLIST:
                return {
                    ...prevState,
                    wishListData: payload
                };
            case REMOVE_FROM_WISHLIST:
                return {
                    ...prevState,
                    wishListData: payload
                }
            case SET_DATA:
                return {
                    ...prevState,
                    productsData: payload.products,
                };
            case INCREMENT_QUANTITY:
                return {
                    ...prevState,
                    cartData: payload
                }
            case DECREMENT_QUANTITY:
                return {
                    ...prevState,
                    cartData: payload
                }
            case REMOVE_FROM_CART:
                return {
                    ...prevState,
                    cartData: payload
                }
            default:
                throw new Error("Action Not Defined");
        }
        // return prevState;
    }

    const [appData, dispatchAppData] = useReducer(appDataReducer, {
        productsData: [],
        cartData: [],
        wishListData: [],
    })

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("https://nvidia-ecommerce.herokuapp.com/products");
                console.log({ response });
                if (response.status === 201) {
                    dispatchAppData({
                        type: SET_DATA,
                        payload: { products: response.data.products }
                    })
                    console.log("data is successfully set");
                }
            } catch (error) {
                console.log("failed to fetch data", error);
            }
        })();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps



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