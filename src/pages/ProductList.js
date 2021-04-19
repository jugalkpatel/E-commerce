import React from "react";
import { ProductCard } from "../components/ProductCard";
import { productsData } from "../services/ProductData.js";
const ProductList = () => {
    const localProductData = productsData;
    return (
        <div className="product-list">
            {
                localProductData.map((product) => {
                    return <ProductCard {...product} />
                })
            }
        </div>
    )
}
export { ProductList };