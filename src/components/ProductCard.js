import React from "react";
import "./ProductCard.css";
import closeBtn from "../assets/svgs/close-btn.svg";
import bookmark from "../assets/svgs/bookmark.svg";
import rating from "../assets/svgs/rating.svg";
import arrow from "../assets/svgs/right-arrow.svg";
import camelCase from "lodash/camelCase";
import { capitalize } from "../utils/capitalize";
const ProductCard = ({
    id,
    name,
    imageUrl,
    specifications,
    price,
    availability
}) => {
    return (
        <div class="product-container" key={id}>
            <a href="#" class="product-info">
                <span class="product__img__container">
                    <button class="close-btn">
                        <img src={closeBtn} alt="close_btn" />
                    </button>
                    <img
                        class="product-img product-info__img"
                        src={imageUrl}
                        alt="product"
                    />
                    <button class="wish-btn">
                        <img src={bookmark} alt="wish_btn" />
                    </button>
                </span>
                <span class="product-info__text">
                    {name.toUpperCase()}
                </span>
                <span class="product-info__specifications">
                    <ul className="specifications__list">
                        {
                            Object.keys(specifications).map((key) => {
                                return (
                                    <li className="specifications__list__item">
                                        <img className="specifications__arrow" src={arrow} alt="right_arrow" />
                                        {capitalize(key)}: {capitalize(specifications[key])}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </span>

                <span class="price-tag">${price}</span>
            </a>
            <button class="primary-btn">ADD TO CART</button>
            {
                !availability ? <div class="overlay-div">
                    <span class="overlay-text"> OUT OF STOCK </span>
                </div> : null
            }
        </div >
    )
}

export { ProductCard }