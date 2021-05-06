import React, { useReducer, useState } from "react";
import { FilterBar } from "../components/FilterBar/FilterBar";
import { ProductCard } from "..//components/ProductCard/ProductCard";
import filterIcon from "../assets/svgs/filter.svg";
import Loader from "react-loader-spinner";
import "./ProductList.css";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { labels } from "../utils/labels";
import { useAppData } from "../contexts/AppDataProvider";



const ProductList = () => {
    const [visibility, setVisibility] = useState("hidden");
    const { LOW_TO_HIGH, HIGH_TO_LOW, EXCLUDE_OUT_OF_STOCK, RESET_FILTERS } = labels;
    const { appData: { productsData } } = useAppData();


    const filterReducer = (state, { type, payload }) => {
        switch (type) {
            case LOW_TO_HIGH:
                return { ...state, byLowest: payload.flag, byHighest: "" };
            case HIGH_TO_LOW:
                return { ...state, byLowest: "", byHighest: payload.flag };
            case EXCLUDE_OUT_OF_STOCK:
                return { ...state, byAvailability: state.byAvailability ? "" : payload.flag };
            case RESET_FILTERS:
                return { ...state, byLowest: "", byHighest: "", byAvailability: "" };
            default:
                throw new Error("Action is not available");
        }
        // return state;
    }


    const [filter, dispatchFilter] = useReducer(filterReducer, {
        byLowest: "",
        byHighest: "",
        byAvailability: "",
    });

    const getSortedProducts = (list, filterFlags) => {
        const filteredList = Object.keys(filterFlags).reduce((acc, item) => {
            switch (filterFlags[item]) {
                case LOW_TO_HIGH:
                    return acc.sort((firstItem, secondItem) => {
                        return parseInt(firstItem.price) - parseInt(secondItem.price)
                    });
                case HIGH_TO_LOW:
                    return acc.sort((firstItem, secondItem) => {
                        return parseInt(secondItem.price) - parseInt(firstItem.price)
                    });
                case EXCLUDE_OUT_OF_STOCK:
                    return acc.filter((item) => item.availability);
                default:
                    return acc;
            }
        }, list);
        return filteredList;
    }

    const filteredProducts = productsData.length > 0 ? getSortedProducts(productsData, filter) : null;



    // console.log({ filter });
    return (
        <>
            {
                productsData.length > 0 ?
                    <div className="product-list__container">
                        <div className="product-list">

                            <FilterBar setFilter={dispatchFilter} />
                            <span className="product-list__results">{filteredProducts.length} results found</span>
                            {
                                filteredProducts.map((product, index) => {
                                    return <ProductCard productDetails={product} key={index} />
                                })
                            }
                        </div>
                        <Sidebar status={{ visibility, setVisibility }} setFilter={dispatchFilter} />
                        <button className="product-list__filterbtn"
                            onClick={() => setVisibility((prevStatus) => {
                                return prevStatus === "hidden" ? "visible" : "hidden";
                            })}
                            style={{ visibility: visibility === "hidden" ? "visible" : "hidden" }}
                        >
                            <span className="product-list__filterbtn__icon">
                                <img src={filterIcon} alt="filter icon" />
                            </span>
                            <span className="product-list__filterbtn__text">
                                FILTER
                            </span>
                        </button>
                    </div> :
                    <span className="product-list__spinner">
                        <Loader type="Oval" color="#b9b9b9" height={100} width={100} />
                    </span>
            }
        </>

    )
}
export { ProductList };