import React from "react";

import './Header.css';

import gpu from "../../assets/svgs/gpu.svg";
import bookmark from "../../assets/svgs/bookmark-nv.svg";
import profile from "../../assets/svgs/profile.svg";
import cart from "../../assets/svgs/cart.svg";

import { useAppData } from "../../contexts/AppDataProvider";
import { Link } from "react-router-dom";

const Header = () => {
    const { appData: { cartData, wishListData } } = useAppData();
    return (
        <div className="header" id="home">
            <Link to="/products" className="header__logo">
                <img src={gpu} alt="logo_icon" height="35px" width="35px" />
                <span className="header__logo__text">
                    VERSE
                </span>
            </Link>
            <div className="header__navigation">
                <ul className="header__navigation__list">
                    <Link to="/cart">
                        <li className="header__navigation__list__item">
                            <button href="#" className="badge-icon">
                                <img src={cart} alt="cart_icon" />
                                {
                                    cartData.length > 0 && <span className="num-badge">
                                        {cartData.length}
                                    </span>
                                }
                            </button>
                        </li>
                    </Link>
                    <Link to="/wishlist">
                        <li className="header__navigation__list__item">
                            <button href="#" className="badge-icon">
                                <img src={bookmark} alt="bookmark__icon" />
                                {
                                    wishListData.length > 0 && <span className="num-badge">{wishListData.length}</span>
                                }
                            </button>
                        </li>
                    </Link>
                    <li className="header__navigation__list__item">
                        <button href="#" className="badge-icon">
                            <img src={profile} alt="profile__icon" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export { Header };