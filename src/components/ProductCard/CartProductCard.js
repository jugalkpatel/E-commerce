import React from "react";

import "./CartProductCard.css";

import arrow from "../../assets/svgs/right-arrow.svg";
import minus from "../../assets/svgs/minus.svg";
import plus from "../../assets/svgs/add.svg";
import close from "../../assets/svgs/close-btn.svg";

import { capitalize } from "../../utils/capitalize";
import { useAppData } from "../../contexts/AppDataProvider";
import { isItemInList } from "../../utils/isItemInList";
import { labels } from "../../utils/labels";


const CartProductCard = ({ productDetails }) => {
    const {
        name,
        imageUrl,
        specifications,
        price,
    } = productDetails;
    const { appData: { cartData, wishListData }, dispatchAppData } = useAppData();
    const { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = labels;
    return (
        <a className="product">
            <button className="product__remove" onClick={() => console.log('close')}>
                <img src={close} alt="close_icon" />
            </button>
            <div className="product__imgcontainer">
                <img src={imageUrl} alt="product image" className="product__img" />
            </div>
            <div className="product__details">
                <span className="product__details__title">{name}</span>
                <span className="prouduct__details__specs">
                    <ul className="product__details__specs__list">
                        {
                            Object.keys(specifications).map((spec, index) => {
                                return (
                                    <li className="product__details__specs__list__item" key={index}>
                                        <img className="specifications__arrow" src={arrow} alt="right_arrow" />
                                        {capitalize(spec)}: {capitalize(specifications[spec])}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </span>
            </div>
            <div className="product__buy">
                <span className="product__buy__price">$ {price}</span>
                <button className="product__buy__increment" onClick={() => console.log("increment")}>
                    <img src={plus} alt="plus icon" />
                </button>
                <span className="product__buy__quantity">1</span>
                <button className="product__buy__decrement" onClick={() => console.log("decrement")}>
                    <img src={minus} alt="minus icon" />
                </button>
            </div>

        </a>
    )
}

export { CartProductCard }
