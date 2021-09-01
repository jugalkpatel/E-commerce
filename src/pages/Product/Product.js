import React from "react";
import { useParams } from "react-router-dom";

import { IoMdCart, IoIosFlash } from "react-icons/io";
import arrow from "../../assets/svgs/right-arrow.svg";
import "./Product.css";

import { useAppData } from "../../contexts";
import { WishListButton } from "../../components/WishListButton/WishListButton";
import { CartButton } from "../../components/CartButton/CartButton";
import { capitalize } from "../../utils/capitalize";
import { Spinner } from "../../components/Spinner/Spinner";

const Product = () => {
  const { id: productID } = useParams();
  const { productsData } = useAppData();
  console.log({ productsData });

  const product = productsData.find((item) => item._id === productID);

  // const { state } = useLocation();

  // const { _id, name, image, specifications, price } = product;

  return (
    <>
      {product ? (
        <div className="product__wrapper">
          <section className="product__section--img">
            <section className="p-box">
              <WishListButton
                data={{
                  type: "ADD",
                  btnClass: "product__button--wishlist",
                  svgClass: "wishlist_icon",
                  payload: {
                    id: product._id,
                  },
                }}
              />
              <section className="i-box">
                <img className="r-img" src={product.image} alt="product" />
              </section>
            </section>
            <section className="product__section--float">
              <CartButton
                data={{
                  type: "ADD",
                  btnClass: "product__button--cart",
                  payload: { id: product._id },
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
            <span className="product__title">{product.name}</span>
            <span className="product__price">
              <span className="c-symbol">$</span>
              {product.price}
            </span>
            <ul className="product__spec">
              {Object.keys(product.specifications).map((spec, index) => {
                return (
                  <li key={index} className="c-item">
                    <img src={arrow} alt="right_arrow" />
                    <span className="product__spec__text">
                      {capitalize(spec)}:{" "}
                      {capitalize(product.specifications[spec])}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export { Product };
