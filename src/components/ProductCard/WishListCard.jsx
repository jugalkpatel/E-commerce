import React from "react";
import { Link } from "react-router-dom";

import "./WishListCard.css";

import { CartButton, WishListButton } from "..";

const WishListCard = ({ productDetails }) => {
  const { _id, name, image, price } = productDetails;

  return (
    <Link
      to={`/product/${_id}`}
      state={{ details: { ...productDetails } }}
      className="w-card"
    >
      <WishListButton
        data={{
          type: "REMOVE",
          btnClass: "w-card__remove",
          svgClass: "wc__icon",
          payload: {
            id: _id,
          },
        }}
      />

      <div className="w-card__imgcontainer">
        <img src={image} alt="product_img" className="w-card__img" />
      </div>
      <div className="w-card__details">
        <span className="w-card__details__title">{name}</span>
        <span className="w-card__details__price">$ {price}</span>
        <CartButton
          data={{ type: "ADD", btnClass: "primary-btn", payload: { id: _id } }}
        />
      </div>
    </Link>
  );
};

export { WishListCard };
