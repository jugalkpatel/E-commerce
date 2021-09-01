import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

import arrow from "../../assets/svgs/right-arrow.svg";

import { capitalize } from "../../utils/capitalize";
import { WishListButton } from "../WishListButton/WishListButton";
import { CartButton } from "../CartButton/CartButton";

const ProductCard = ({ productDetails }) => {
  const { _id, name, image, specifications, price, availableQuantity } =
    productDetails;

  return (
    <div className="product-container" key={_id}>
      <Link
        to={`/product/${_id}`}
        state={{ details: { ...productDetails } }}
        className="product-info"
      >
        <span className="product__img__container">
          <img
            className="product-img product-info__img"
            src={image}
            alt="product"
          />
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
            <div className="overlay-div">
              <span className="overlay-text"> OUT OF STOCK </span>
            </div>
          ) : null}
        </span>
        <span className="product-info__text">{name.toUpperCase()}</span>
        <span className="product-info__specifications">
          <ul className="specifications__list">
            {Object.keys(specifications).map((spec, index) => {
              return (
                <li className="specifications__list__item" key={index}>
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
