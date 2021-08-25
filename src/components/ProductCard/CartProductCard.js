import React from "react";

import "./CartProductCard.css";

import arrow from "../../assets/svgs/right-arrow.svg";
import minus from "../../assets/svgs/minus.svg";
import plus from "../../assets/svgs/plus.svg";
import close from "../../assets/svgs/close-btn.svg";

import { capitalize } from "../../utils/capitalize";
import { useAppData } from "../../contexts";
import { actions } from "../../utils/actions";
import { urlList } from "../../utils/urlList";
import { CartButton } from "../CartButton/CartButton";

const CartProductCard = ({ productDetails }) => {
  const { INCREMENT_QUANTITY, DECREMENT_QUANTITY, REMOVE_FROM_CART } = actions;

  const { _id, name, image, specifications, price, quantity } = productDetails;

  const { REMOVE_ITEM, UPDATE_ITEM } = urlList;

  const { dispatchAppData, handleAPIOperations } = useAppData();
  return (
    <a href="#home" className="product">
      {/* <button
        className="product__remove"
        onClick={() =>
          handleAPIOperations(
            REMOVE_ITEM,
            { id: _id },
            dispatchAppData,
            REMOVE_FROM_CART
          )
        }
      >
        <img src={close} alt="close_icon" />
      </button> */}

      <CartButton
        data={{
          type: "REMOVE",
          btnClass: "product__remove",
          payload: {
            id: _id,
          },
        }}
      />

      <div className="product__imgcontainer">
        <img src={image} alt="product_img" className="product__img" />
      </div>
      <div className="product__details">
        <span className="product__details__title">{name}</span>
        <span className="prouduct__details__specs">
          <ul className="product__details__specs__list">
            {Object.keys(specifications).map((spec, index) => {
              return (
                <li className="product__details__specs__list__item" key={index}>
                  <img
                    className="specifications__arrow"
                    src={arrow}
                    alt="right_arrow"
                  />
                  {capitalize(spec)}: {capitalize(specifications[spec])}
                </li>
              );
            })}
          </ul>
        </span>
      </div>
      <div className="product__buy">
        <span className="product__buy__price">$ {price}</span>
        <button
          className="product__buy__increment"
          onClick={() =>
            handleAPIOperations(
              UPDATE_ITEM,
              { id: _id, quantity: quantity + 1 },
              dispatchAppData,
              INCREMENT_QUANTITY
            )
          }
        >
          <img src={plus} alt="plus icon" />
        </button>
        <span className="product__buy__quantity">{quantity}</span>
        <button
          className="product__buy__decrement"
          onClick={() =>
            handleAPIOperations(
              UPDATE_ITEM,
              { id: _id, quantity: quantity > 1 ? quantity - 1 : 1 },
              dispatchAppData,
              DECREMENT_QUANTITY
            )
          }
        >
          <img src={minus} alt="minus icon" />
        </button>
      </div>
    </a>
  );
};

export { CartProductCard };
