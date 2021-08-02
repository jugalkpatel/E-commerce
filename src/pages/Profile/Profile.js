import React from "react";
import "./Profile.css";

import { useAuthData } from "../../contexts";
const Profile = () => {
  const { handleLogout } = useAuthData();
  return (
    <div className="profile">
      <button className="profile__logout" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export { Profile };
