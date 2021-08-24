import React from "react";
import { useLocation, Link } from "react-router-dom";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { IoMdCart, IoIosFlash } from "react-icons/io";
import arrow from "../../assets/svgs/right-arrow.svg";
import "./Product.css";

import { capitalize } from "../../utils/capitalize";
import { useAppData } from "../../contexts";
import { actions } from "../../utils/actions";
import { urlList } from "../../utils/urlList";
import { isItemInList } from "../../utils/isItemInList";
import { WishListButton } from "../../components/WishListButton/WishListButton";

const Product = () => {
  const { state } = useLocation();

  const { _id, name, image, specifications, price } = state.details;

  const { cartData, wishListData, handleAPIOperations, dispatchAppData } =
    useAppData();

  // eslint-disable-next-line no-unused-vars
  const { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = actions;

  // eslint-disable-next-line no-unused-vars
  const { ADD_ITEM, ADD_ITEM_TO_WISHLIST, REMOVE_ITEM_FROM_WISHLIST } = urlList;

  // eslint-disable-next-line no-unused-vars
  const isInWishList = isItemInList(wishListData, _id);

  return (
    <div className="product__wrapper">
      <section className="product__section--img">
        <section className="p-box">
          {/* <button
            className="product__button--wishlist"
            onClick={
              isInWishList
                ? () =>
                    handleAPIOperations(
                      REMOVE_ITEM_FROM_WISHLIST,
                      { id: _id },
                      dispatchAppData,
                      REMOVE_FROM_WISHLIST
                    )
                : () =>
                    handleAPIOperations(
                      ADD_ITEM_TO_WISHLIST,
                      { id: _id },
                      dispatchAppData,
                      ADD_TO_WISHLIST
                    )
            }
          >
            {isInWishList ? (
              <FaBookmark className="wishlist__icon" />
            ) : (
              <FaRegBookmark className="wishlist__icon" />
            )}
          </button> */}
          <WishListButton
            data={{
              type: "ADD",
              btnClass: "product__button--wishlist",
              svgClass: "wishlist__icon",
              payload: {
                id: _id,
              },
            }}
          />
          <section className="i-box">
            <img className="r-img" src={image} alt="product" />
          </section>
        </section>
        <section className="product__section--float">
          {isItemInList(cartData, _id) ? (
            <Link to="/cart" className="product__button--cart">
              GO TO CART
            </Link>
          ) : (
            <button
              className="product__button--cart"
              onClick={() =>
                handleAPIOperations(
                  ADD_ITEM,
                  { id: _id },
                  dispatchAppData,
                  ADD_TO_CART
                )
              }
            >
              <IoMdCart className="pd__icon" />
              <span className="b-text">ADD TO CART</span>
            </button>
          )}
          <button className="product__button--order">
            <IoIosFlash className="pd__icon" />
            <span className="b-text">ORDER NOW</span>
          </button>
        </section>
      </section>
      <section className="product__section--details">
        <span className="product__title">{name}</span>
        <span className="product__price">
          <span className="c-symbol">$</span>
          {price}
        </span>
        <ul className="product__spec">
          {Object.keys(specifications).map((spec, index) => {
            return (
              <li key={index} className="c-item">
                <img src={arrow} alt="right_arrow" />
                <span className="product__spec__text">
                  {capitalize(spec)}: {capitalize(specifications[spec])}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export { Product };
