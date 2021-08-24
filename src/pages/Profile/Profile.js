import React from "react";
import "./Profile.css";

import { logout } from "../../utils/logout";
import { useAppData, useAuthData } from "../../contexts";

const Profile = () => {
  const { clearUserCredentials } = useAuthData();
  const { dispatchAppData } = useAppData();
  console.log({ clearUserCredentials });
  return (
    <div className="profile">
      <button
        className="profile__logout"
        onClick={() => logout(clearUserCredentials, dispatchAppData)}
      >
        LOGOUT
      </button>
    </div>
  );
};

export { Profile };
