import React from "react";

import "./WishListCard.css";

import close from "../../assets/svgs/close-btn.svg";

import { useAppData } from "../../contexts/AppDataProvider";
import { labels } from "../../utils/labels";
import { urlList } from "../../utils/urlList";
import { handleApiOperations } from "../../utils/handleApiOperations";

const WishListCard = ({ productDetails }) => {
    const {
        _id,
        name,
        image,
        price,
    } = productDetails;
    const { dispatchAppData } = useAppData();
    const { REMOVE_FROM_WISHLIST } = labels;
    const { REMOVE_ITEM_FROM_WISHLIST } = urlList;
    return (
        <a href="#home" className="wishlist__product" key={_id}>
            <button className="wishlist__product__remove" onClick={() => handleApiOperations(
                REMOVE_ITEM_FROM_WISHLIST,
                { id: _id },
                dispatchAppData,
                REMOVE_FROM_WISHLIST
            )}>
                <img src={close} alt="close_icon" />
            </button>
            <div className="wishlist__product__imgcontainer">
                <img src={image} alt="product_img" className="wishlist__product__img" />
            </div>
            <div className="wishlist__product__details">
                <span className="wishlist__product__details__title">{name}</span>
                <span className="wishlist__product__details__price">$ {price}</span>
            </div>
        </a>
    )
}



export { WishListCard };