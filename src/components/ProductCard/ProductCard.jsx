import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

import arrow from "../../assets/svgs/right-arrow.svg";

import { WishListButton, CartButton } from "..";
import { capitalize } from "../../utils/capitalize";

const ProductCard = ({ productDetails }) => {
  const { _id, name, image, specifications, price, availableQuantity } =
    productDetails;

  return (
    <div className="pc--container" key={_id}>
      <Link
        to={`/product/${_id}`}
        state={{ details: { ...productDetails } }}
        className="p-card"
      >
        <span className="p-card__img--container">
          <img className="p-card__img" src={image} alt="product_img" />
          <WishListButton
            data={{
              type: "ADD",
              btnClass: "wish-btn",
              svgClass: "wishlist_icon",
              payload: {
                id: _id,
              },
            }}
          />
          {availableQuantity < 1 ? (
            <div className="p-card__overlay">
              <span className="p-card__overlay__text"> OUT OF STOCK </span>
            </div>
          ) : null}
        </span>
        <span className="p-card__title">{name.toUpperCase()}</span>
        <span className="p-card__specifications">
          <ul className="pc__list">
            {Object.keys(specifications).map((spec, index) => {
              return (
                <li className="pc__list__item" key={index}>
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
        <span className="price-tag">${price}</span>
      </Link>

      <CartButton
        data={{ type: "ADD", btnClass: "primary-btn", payload: { id: _id } }}
      />
    </div>
  );
};

export { ProductCard };
