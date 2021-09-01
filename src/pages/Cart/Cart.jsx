import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "./Cart.css";

import { useAppData } from "../../contexts";
import { CartProductCard, NoResults } from "../../components";
import { totalPrice } from "../../utils/totalPrice";

const Cart = () => {
  const navigate = useNavigate();

  const { cartData } = useAppData();
  return (
    <>
      <div className="cart">
        {cartData.length > 0 ? (
          <div className="cart--grid">
            <div className="cart__products">
              {cartData.map((product) => {
                return (
                  <CartProductCard productDetails={product} key={product._id} />
                );
              })}
            </div>
            <div className="cart__checkout">
              <h3 className="cart__checkout__title">PRICE DETAILS</h3>
              <span className="cart__checkout__totalprice">
                Total Amount: $ {totalPrice(cartData)}
              </span>
              <button
                className="cart__checkoutbtn"
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
          <NoResults
            mainText="Your cart is empty!"
            subText="Add items to it now."
            redirect
          />
        )}
      </div>
      <Outlet />
    </>
  );
};

export { Cart };
