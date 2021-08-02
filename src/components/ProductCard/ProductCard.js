import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

import arrow from "../../assets/svgs/right-arrow.svg";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import { capitalize } from "../../utils/capitalize";
import { useAppData } from "../../contexts";
import { isItemInList } from "../../utils/isItemInList";
import { constants } from "../../utils/constants";
import { urlList } from "../../utils/urlList";

const ProductCard = ({ productDetails }) => {
  const { _id, name, image, specifications, price, quantity } = productDetails;

  const {
    appData: { cartData, wishListData },
    dispatchAppData,
    handleAPIOperations,
  } = useAppData();

  const { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = constants;

  const { ADD_ITEM, ADD_ITEM_TO_WISHLIST, REMOVE_ITEM_FROM_WISHLIST } = urlList;

  const isInWishList = isItemInList(wishListData, _id);

  const handleWishlistClick = (event) => {
    event.preventDefault();
    if (isInWishList) {
      handleAPIOperations(
        REMOVE_ITEM_FROM_WISHLIST,
        { id: _id },
        dispatchAppData,
        REMOVE_FROM_WISHLIST
      );
    }
    handleAPIOperations(
      ADD_ITEM_TO_WISHLIST,
      { id: _id },
      dispatchAppData,
      ADD_TO_WISHLIST
    );
  };

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
          <button className="wish-btn" onClick={handleWishlistClick}>
            {isInWishList ? (
              <FaBookmark className="wishlist__icon" />
            ) : (
              <FaRegBookmark className="wishlist__icon" />
            )}
          </button>
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
      {isItemInList(cartData, _id) ? (
        <Link to="/cart" className="primary-btn">
          GO TO CART
        </Link>
      ) : (
        <button
          className="primary-btn"
          onClick={() =>
            handleAPIOperations(
              ADD_ITEM,
              { id: _id },
              dispatchAppData,
              ADD_TO_CART
            )
          }
        >
          ADD TO CART
        </button>
      )}
      {quantity < 1 ? (
        <div className="overlay-div">
          <span className="overlay-text"> OUT OF STOCK </span>
        </div>
      ) : null}
    </div>
  );
};

export { ProductCard };
