import React from "react";

import './Cart.css';

import gpu from "../assets/svgs/gpu.svg";

import { useAppData } from "../contexts/AppDataProvider";
import { CartProductCard } from "../components/ProductCard/CartProductCard";
import { Link } from "react-router-dom";
import { totalPrice } from "../utils/totalPrice";

const Cart = () => {
    const { appData: { cartData } } = useAppData();
    return (
        <div className="cart">
            {
                cartData.length > 0
                    ?
                    <div className="cart__content">
                        <div className="cart__content__products">
                            {
                                cartData.map((product) => {
                                    return <CartProductCard productDetails={product} key={product.id} />
                                })
                            }
                        </div>
                        <div className="cart__content__checkout">
                            <h3 className="cart__content__checkout__title">PRICE DETAILS</h3>
                            <span className="cart__content__checkout__totalprice">
                                Total Amount: {totalPrice(cartData)}
                            </span>
                            <button className="cart__content__checkout__checkoutbtn">
                                Checkout
                            </button>
                        </div>
                    </div>
                    :
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

            }
        </div>
    )
}

export { Cart };


