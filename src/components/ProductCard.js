import React from "react";
import "./ProductCard.css";
import closeBtn from "../assets/svgs/close-btn.svg";
import bookmark from "../assets/svgs/bookmark.svg";
import arrow from "../assets/svgs/right-arrow.svg";
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
        <div className="product-container">
            <a href="#" className="product-info">
                <span className="product__img__container">
                    <button className="close-btn">
                        <img src={closeBtn} alt="close_btn" />
                    </button>
                    <img
                        className="product-img product-info__img"
                        src={imageUrl}
                        alt="product"
                    />
                    <button className="wish-btn">
                        <img src={bookmark} alt="wish_btn" />
                    </button>
                </span>
                <span className="product-info__text">
                    {name.toUpperCase()}
                </span>
                <span className="product-info__specifications">
                    <ul className="specifications__list">
                        {
                            Object.keys(specifications).map((spec) => {
                                return (
                                    /**
                                     * TODO: decide what should be key here later
                                     **/
                                    <li className="specifications__list__item">
                                        <img className="specifications__arrow" src={arrow} alt="right_arrow" />
                                        {capitalize(spec)}: {capitalize(specifications[spec])}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </span>

                <span className="price-tag">${price}</span>
            </a>
            <button className="primary-btn">ADD TO CART</button>
            {
                !availability ? <div className="overlay-div">
                    <span className="overlay-text"> OUT OF STOCK </span>
                </div> : null
            }
        </div>
    )
}

export { ProductCard }