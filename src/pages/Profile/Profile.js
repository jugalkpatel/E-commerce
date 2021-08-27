import React from "react";
import { useNavigate } from "react-router";

import "./Profile.css";

import { logout } from "../../utils/logout";
import { useAuthData } from "../../contexts";

const Profile = () => {
  const { dispatchAuthData } = useAuthData();
  const navigate = useNavigate();
  return (
    <div className="profile">
      <button
        className="profile__logout"
        onClick={() => logout(dispatchAuthData, navigate)}
      >
        LOGOUT
      </button>
    </div>
  );
};

export { Profile };
