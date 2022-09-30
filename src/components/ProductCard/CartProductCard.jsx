import React from "react";
import { Link } from "react-router-dom";
import "./CartProductCard.css";

import arrow from "../../assets/svgs/right-arrow.svg";

import { QuantityButton, CartButton } from "..";
import { capitalize } from "../../utils/capitalize";

const CartProductCard = ({ productDetails }) => {
  const { _id, name, image, specifications, price, quantity } = productDetails;

  // console.log({ specifications });

  return (
    <Link to={`/product/${_id}`} className="c-card">
      <CartButton
        data={{
          type: "REMOVE",
          btnClass: "c-card__remove",
          payload: {
            id: _id,
          },
        }}
      />

      <div className="c-card__ibox">
        <img src={image} alt="c-card_img" className="c-card__img" />
      </div>
      <div className="c-card__details">
        <span className="c-card__details__title">{name}</span>
        <span className="c-card__details__specs">
          <ul className="cc__list">
            {Object.keys(specifications).map((spec) => {
              return (
                <li className="cc__list__item" key={spec}>
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
      <div className="c-card__buy">
        <span className="c-card__buy__price">$ {price}</span>
        <QuantityButton
          data={{
            type: "INCREMENT",
            btnClass: "c-card__buy__increment",
            payload: { id: _id },
            quantity,
          }}
        />

        <span className="c-card__buy__quantity">{quantity}</span>

        <QuantityButton
          data={{
            type: "DECREMENT",
            btnClass: "c-card__buy__decrement",
            payload: { id: _id },
            quantity,
          }}
        />
      </div>
    </Link>
  );
};

export { CartProductCard };
