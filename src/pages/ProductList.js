import React, { useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { ProductCard } from "../components/ProductCard";

import filter from "../assets/svgs/filter.svg";
import { productsData } from "../services/ProductData.js";
import "./ProductList.css";
import { Sidebar } from "../components/Sidebar/Sidebar";
const ProductList = () => {
    const [visibility, setVisibility] = useState("");
    const localProductData = productsData;
    return (
        <div className="product-list__container">
            <div className="product-list">

                <FilterBar />
                {
                    localProductData.map((product) => {
                        return <ProductCard {...product} />
                    })
                }
            </div>
            <Sidebar status={{ visibility, setVisibility }} />
            <button className="product-list__filterbtn"
                onClick={() => setVisibility((prevStatus) => {
                    return prevStatus === "hidden" ? "visible" : "hidden";
                })}
                style={{ visibility: visibility === "hidden" ? "visible" : "hidden" }}
            >
                <span className="product-list__filterbtn__icon">
                    <img src={filter} alt="filter icon" />
                </span>
                <span className="product-list__filterbtn__text">
                    FILTER
                </span>
            </button>
        </div>
    )
}
export { ProductList };