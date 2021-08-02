import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";

import filterIcon from "../../assets/svgs/filter.svg";
import Loader from "react-loader-spinner";
import "./ProductList.css";

import { Sidebar } from "../../components/Sidebar/Sidebar";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";

import { constants } from "../../utils/constants";
import { useAppData, useToast } from "../../contexts";
import { getSortedProducts } from "../../utils/getSortedProducts";

const ProductList = () => {
  const [visibility, setVisibility] = useState("hidden");
  const {
    LOW_TO_HIGH,
    HIGH_TO_LOW,
    EXCLUDE_OUT_OF_STOCK,
    RESET_FILTERS,
    SET_PRODUCTS_DATA,
  } = constants;

  const {
    appData: { productsData },
    dispatchAppData,
  } = useAppData();

  const { setupToast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/products");
        if (response.status === 201) {
          dispatchAppData({
            type: SET_PRODUCTS_DATA,
            payload: { products: response.data.products },
          });
        }
      } catch (error) {
        //TODO: SHOW TOAST
        setupToast(true, "failed to fetch products");
      }
    })();
  }, []);

  const filterReducer = (state, { type, payload }) => {
    switch (type) {
      case LOW_TO_HIGH:
        return { ...state, byLowest: payload.flag, byHighest: "" };
      case HIGH_TO_LOW:
        return { ...state, byLowest: "", byHighest: payload.flag };
      case EXCLUDE_OUT_OF_STOCK:
        return {
          ...state,
          byAvailability: state.byAvailability ? "" : payload.flag,
        };
      case RESET_FILTERS:
        return { ...state, byLowest: "", byHighest: "", byAvailability: "" };
      default:
        throw new Error("Action is not available");
    }
  };

  const [filter, dispatchFilter] = useReducer(filterReducer, {
    byLowest: "",
    byHighest: "",
    byAvailability: "",
  });

  const filteredProducts =
    productsData.length > 0 ? getSortedProducts(productsData, filter) : null;

  return (
    <>
      {filteredProducts ? (
        <div className="product-list__container">
          <div className="product-list">
            <FilterBar setFilter={dispatchFilter} />
            <span className="product-list__results">
              {filteredProducts.length} results found
            </span>
            {filteredProducts.map((product, index) => {
              return <ProductCard productDetails={product} key={index} />;
            })}
          </div>
          <Sidebar
            status={{ visibility, setVisibility }}
            setFilter={dispatchFilter}
          />
          <button
            className="product-list__filterbtn"
            onClick={() =>
              setVisibility((prevStatus) => {
                return prevStatus === "hidden" ? "visible" : "hidden";
              })
            }
            style={{
              visibility: visibility === "hidden" ? "visible" : "hidden",
            }}
          >
            <span className="product-list__filterbtn__icon">
              <img src={filterIcon} alt="filter icon" />
            </span>
            <span className="product-list__filterbtn__text">FILTER</span>
          </button>
        </div>
      ) : (
        <span className="product-list__spinner">
          <Loader type="Oval" color="#b9b9b9" height={100} width={100} />
        </span>
      )}
    </>
  );
};

export { ProductList };
