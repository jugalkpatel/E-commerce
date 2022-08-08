import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Profile.css";
import { CgProfile } from "react-icons/cg";

import { useAuthData, useAppData, useToast } from "../../contexts";
import { logout } from "../../utils/logout";
import { capitalize } from "../../utils/capitalize";

const Profile = () => {
  const { userName, dispatchAuthData } = useAuthData();
  const { cartData, wishListData } = useAppData();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(dispatchAuthData, navigate);
    addToast("Logout Successfully", "success");
  };
  return (
    <div className="profile">
      <article className="profile__content">
        <section className="profile__uname">
          <span className="profile__uname__icon">
            <CgProfile className="profile__uname--icon" />
          </span>
          <span className="profile__uname__text">{capitalize(userName)}</span>
        </section>
        <section className="pf--container">
          <Link to="/cart" className="profile__cart">
            <span className="profile__cart--text">Cart</span>
            <span className="profile__cart--count">{cartData.length}</span>
          </Link>

          <Link to="/wishlist" className="profile__wishlist">
            <span className="profile__wishlist--text">Wishlist</span>
            <span className="profile__wishlist--count">
              {wishListData.length}
            </span>
          </Link>
        </section>
        <section className="pf--container">
          <button className="profile__logout" onClick={handleLogout}>
            LOGOUT
          </button>
        </section>
      </article>
    </div>
  );
};

export { Profile };
