import React from "react";

import "./WishListCard.css";

import close from "../../assets/svgs/close-btn.svg";

import { capitalize } from "../../utils/capitalize";
import { useAppData } from "../../contexts/AppDataProvider";
import { isItemInList } from "../../utils/isItemInList";
import { labels } from "../../utils/labels";


const WishListCard = ({ productDetails }) => {
    const {
        name,
        imageUrl,
        price,
    } = productDetails;
    console.log({ name, imageUrl, price });
    return (
        <a className="wishlist__product">
            <button className="wishlist__product__remove" onClick={() => console.log('close')}>
                <img src={close} alt="close_icon" />
            </button>
            <div className="wishlist__product__imgcontainer">
                <img src={imageUrl} alt="product image" className="wishlist__product__img" />
            </div>
            <div className="wishlist__product__details">
                <span className="wishlist__product__details__title">{name}</span>
                <span className="wishlist__product__details__price">$ {price}</span>
            </div>
        </a>
    )
}



export { WishListCard };