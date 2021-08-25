import React from "react";

import "./CartProductCard.css";

import arrow from "../../assets/svgs/right-arrow.svg";

import { capitalize } from "../../utils/capitalize";
import { CartButton } from "../CartButton/CartButton";
import { QuantityButton } from "../QuantityButton/QuantityButton";

const CartProductCard = ({ productDetails }) => {
  const { _id, name, image, specifications, price, quantity } = productDetails;

  return (
    <a href="#home" className="product">
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
        <QuantityButton
          data={{
            type: "INCREMENT",
            btnClass: "product__buy__increment",
            payload: { id: _id, quantity: quantity + 1 },
          }}
        />
        <span className="product__buy__quantity">{quantity}</span>

        <QuantityButton
          data={{
            type: "DECREMENT",
            btnClass: "product__buy__decrement",
            payload: { id: _id, quantity: quantity > 1 ? quantity - 1 : 1 },
          }}
        />
      </div>
    </a>
  );
};

export { CartProductCard };
