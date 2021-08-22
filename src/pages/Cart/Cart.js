import React from "react";
import { useNavigate } from "react-router-dom";

import "./Cart.css";
import gpu from "../../assets/svgs/gpu.svg";

import { useAppData } from "../../contexts";
import { CartProductCard } from "../../components/ProductCard/CartProductCard";
import { Link, Outlet } from "react-router-dom";
import { totalPrice } from "../../utils/totalPrice";

const Cart = () => {
  const navigate = useNavigate();

  const { cartData } = useAppData();
  return (
    <>
      <div className="cart">
        {cartData.length > 0 ? (
          <div className="c-grid">
            <div className="cart__products">
              {cartData.map(({ quantity, product }) => {
                return (
                  <CartProductCard
                    productDetails={product}
                    quantity={quantity}
                    key={product._id}
                  />
                );
              })}
            </div>
            <div className="cart__checkout">
              <h3 className="cart__checkout__title">PRICE DETAILS</h3>
              <span className="cart__checkout__totalprice">
                Total Amount: $ {totalPrice(cartData)}
              </span>
              <button
                className="cart__checkout__checkoutbtn"
                onClick={() =>
                  navigate("/cart/checkout", {
                    state: { details: { cartData } },
                  })
                }
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="cart__empty">
            <div className="cart__empty__imgcontainer">
              <img src={gpu} alt="gpu" className="cart__empty__image" />
            </div>
            <h3 className="cart__empty__text">Your cart is empty!</h3>
            <span className="cart__empty__subtext">Add items to it now.</span>
            <Link to="/products" className="cart__empty__shopbtn">
              SHOP NOW
            </Link>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export { Cart };
