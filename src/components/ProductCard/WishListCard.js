import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./WishListCard.css";

import { useAppData } from "../../contexts";
import { actions } from "../../utils/actions";
import { urlList } from "../../utils/urlList";
import { isItemInList } from "../../utils/isItemInList";
import { WishListButton } from "../WishListButton/WishListButton";

const WishListCard = ({ productDetails }) => {
  const { _id, name, image, price } = productDetails;

  const { dispatchAppData, handleAPIOperations, cartData } = useAppData();

  const { REMOVE_FROM_WISHLIST, ADD_TO_CART } = actions;
  const { REMOVE_ITEM_FROM_WISHLIST, ADD_ITEM } = urlList;

  const handleClick = (event) => {
    event.preventDefault();

    if (event.target.innerText === "GO TO CART") {
      navigate("/cart");
      return;
    }

    if (event.target.innerText === "ADD TO CART") {
      handleAPIOperations(ADD_ITEM, { id: _id }, dispatchAppData, ADD_TO_CART);
      return;
    }

    handleAPIOperations(
      REMOVE_ITEM_FROM_WISHLIST,
      { id: _id },
      dispatchAppData,
      REMOVE_FROM_WISHLIST
    );
  };

  const navigate = useNavigate();
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
        {isItemInList(cartData, _id) ? (
          <button className="primary-btn" onClick={handleClick}>
            GO TO CART
          </button>
        ) : (
          <button className="primary-btn" onClick={handleClick}>
            ADD TO CART
          </button>
        )}
      </div>
    </Link>
  );
};

export { WishListCard };
