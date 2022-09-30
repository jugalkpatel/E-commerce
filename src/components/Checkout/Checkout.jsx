import React from "react";
import { useNavigate } from "react-router-dom";

import "./Checkout.css";
import { IoClose } from "react-icons/io5";

import { useAppData } from "../../contexts";

const Checkout = () => {
  const { cartData } = useAppData();

  const navigate = useNavigate();

  return (
    <div className="checkout">
      <div className="checkout__dialog">
        <ul className="ch__list">
          {cartData.map(({ _id, name, image, link }) => {
            return (
              <li className="ch__list__item" key={_id}>
                <span className="i-wrapper">
                  <img src={image} alt="product" className="r-img" />
                </span>
                <span className="checkout__product__name">{name}</span>
                <a
                  href={link}
                  className="checkout__product__link"
                  target="_blank"
                  rel="nopener noreferrer"
                >
                  BUY
                </a>
              </li>
            );
          })}
        </ul>
        <button className="checkout__close" onClick={() => navigate(-1)}>
          <IoClose className="icon__close" />
        </button>
      </div>
    </div>
  );
};

export { Checkout };
