import React from "react";
import "./ProductCard.css";
import closeBtn from "../assets/svgs/close-btn.svg";
import wishBtn from "../assets/svgs/product-wish.svg";
import rating from "../assets/svgs/rating.svg";
const ProductCard = () => {
    return (
        <div class="product-container">
            <a href="#" class="product-info">
                <span class="product__img__container">
                    <img
                        class="product-img product-info__img"
                        src="https://source.unsplash.com/random/"
                        alt="product"
                    />
                    <button class="wish-btn">
                        <img src={wishBtn} alt="wish_btn" />
                    </button>
                </span>
                <span class="product-info__text">
                    lorem ipsum Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Distinctio, veniam!
                </span>
                <span class="product-info__small">
                    Lorem ipsum dolor sit Lorem Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Quisquam, ipsa.
                </span >
                <span class="product-info__rating">
                    <img src={rating} alt="rating_icon" />
                4.5
                </span>
                <span class="price-tag">Rs. 250</span>
            </a>
            <button class="primary-btn">ADD TO CART</button>
            <div class="overlay-div">
                <button class="close-btn">
                    <img src={closeBtn} alt="close-btn" />
                </button>
                <span class="overlay-text"> OUT OF STOCK </span>
            </div>
        </div>
    )
}

export { ProductCard }