import React from "react";
import { Link } from "react-router-dom";

import "./WishListCard.css";

import { WishListButton } from "../WishListButton/WishListButton";
import { CartButton } from "../CartButton/CartButton";

const WishListCard = ({ productDetails }) => {
  const { _id, name, image, price } = productDetails;

  return (
    <Link
      to={`/product/${_id}`}
      state={{ details: { ...productDetails } }}
      className="wishlist__product"
    >
      <WishListButton
        data={{
          type: "REMOVE",
          btnClass: "wishlist__product__remove",
          svgClass: "wc__icon",
          payload: {
            id: _id,
          },
        }}
      />

      <div className="wishlist__product__imgcontainer">
        <img src={image} alt="product_img" className="wishlist__product__img" />
      </div>
      <div className="wishlist__product__details">
        <span className="wishlist__product__details__title">{name}</span>
        <span className="wishlist__product__details__price">$ {price}</span>
        <CartButton
          data={{ type: "ADD", btnClass: "primary-btn", payload: { id: _id } }}
        />
      </div>
    </Link>
  );
};

export { WishListCard };
