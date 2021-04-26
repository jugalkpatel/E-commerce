import React from "react";

import "./WishListCard.css";

import close from "../../assets/svgs/close-btn.svg";

import { useAppData } from "../../contexts/AppDataProvider";
import { labels } from "../../utils/labels";

const WishListCard = ({ productDetails }) => {
    const {
        id,
        name,
        imageUrl,
        price,
    } = productDetails;
    const { dispatchAppData } = useAppData();
    const { REMOVE_FROM_WISHLIST } = labels;
    return (
        <a className="wishlist__product">
            <button className="wishlist__product__remove" onClick={() => dispatchAppData({ type: REMOVE_FROM_WISHLIST, payload: { data: id } })}>
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