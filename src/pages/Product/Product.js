import React from "react";
import { useLocation } from "react-router-dom";

import { IoMdCart, IoIosFlash } from "react-icons/io";
import arrow from "../../assets/svgs/right-arrow.svg";
import "./Product.css";

import { capitalize } from "../../utils/capitalize";
import { WishListButton } from "../../components/WishListButton/WishListButton";
import { CartButton } from "../../components/CartButton/CartButton";

const Product = () => {
  const { state } = useLocation();

  const { _id, name, image, specifications, price } = state.details;

  return (
    <div className="product__wrapper">
      <section className="product__section--img">
        <section className="p-box">
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
          <CartButton
            data={{
              type: "ADD",
              btnClass: "product__button--cart",
              payload: { id: _id },
              svg: <IoMdCart className="pd__icon" />,
            }}
          />

          <button className="product__button--order">
            <IoIosFlash className="pd__icon" />
            <span>ORDER NOW</span>
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
