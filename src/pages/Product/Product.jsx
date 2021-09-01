import React from "react";
import { useParams } from "react-router-dom";

import { IoMdCart, IoIosFlash } from "react-icons/io";
import arrow from "../../assets/svgs/right-arrow.svg";
import "./Product.css";

import { useAppData } from "../../contexts";
import { WishListButton, CartButton, Spinner } from "../../components";
import { capitalize } from "../../utils/capitalize";
import { ScrollList } from "../../components";

const Product = () => {
  const { id: productID } = useParams();
  const { productsData } = useAppData();

  const product = productsData.find((item) => item._id === productID);

  return (
    <>
      {product ? (
        <div className="product">
          <div className="product__content">
            <article className="product__section--img">
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
                <article className="i-box">
                  <img className="r-img" src={product.image} alt="product" />
                </article>
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

                <a
                  href={product.link}
                  className="product__button--order"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <IoIosFlash className="pd__icon" />
                  <span>ORDER NOW</span>
                </a>
              </section>
            </article>
            <article className="product__section--details">
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
            </article>
          </div>
          <div className="product__similar">
            <ScrollList id={product._id} manufacturer={product.manufacturer} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export { Product };
