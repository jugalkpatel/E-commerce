import React from "react";

import './Header.css';

import gpu from "../../assets/svgs/gpu.svg";
import bookmark from "../../assets/svgs/bookmark-nv.svg";
import profile from "../../assets/svgs/profile.svg";
import cart from "../../assets/svgs/cart.svg";
import { useAppData } from "../../contexts/AppDataProvider";
const Header = () => {
    const { appData: { cartData, wishListData } } = useAppData();
    return (
        <div className="header">
            <a className="header__logo">
                <img src={gpu} alt="logo_icon" height="35px" width="35px" />
                <span className="header__logo__text">
                    VERSE
                </span>
            </a>
            <div className="header__navigation">
                <ul className="header__navigation__list">
                    <li className="header__navigation__list__item">
                        <a href="#" className="badge-icon">
                            <img src={cart} alt="cart_icon" />
                            {
                                cartData.length > 0 && <span className="num-badge cart-badge">
                                    {cartData.length}
                                </span>
                            }
                        </a>
                    </li>
                    <li className="header__navigation__list__item">
                        <a href="#" className="badge-icon">
                            <img src={bookmark} alt="bookmark__icon" />
                            {
                                wishListData.length > 0 && <span className="num-badge cart-badge">10</span>
                            }
                        </a>
                    </li>
                    <li className="header__navigation__list__item">
                        <a href="#" className="badge-icon">
                            <img src={profile} alt="profile__icon" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export { Header };