import React, { useState } from "react";
import { useNavigate } from "react-router";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Loader from "react-loader-spinner";

import { useAppData, useAuthData, dispatchAppData } from "../../contexts";
import { isItemInList } from "../../utils/isItemInList";
import { constants } from "../../utils/constants";

import { postAPI } from "../../utils/postAPI";
const WishListButton = ({ data }) => {
  const [isLoading, setLoading] = useState(true);
  const { type, btnClass, svgClass, payload } = data;
  const { wishListData } = useAppData();
  const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = constants;

  const { isLoggedIn } = useAuthData();

  const navigate = useNavigate();

  const isInWishList = isItemInList(wishListData, payload.id);

  const action = !isInWishList ? ADD_TO_WISHLIST : REMOVE_FROM_WISHLIST;

  const url = !isInWishList
    ? `/user/${payload.id}/wishlist/add`
    : `/user/${payload.id}/wishlist/remove`;
  const svg = !isInWishList ? (
    <FaBookmark className={svgClass} />
  ) : type === "REMOVE" ? (
    <IoMdClose className={svgClass} />
  ) : (
    <FaRegBookmark className={svgClass} />
  );

  const onButtonClick = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!isLoading) {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      const { data, status } = await postAPI(url, payload);

      if (status === 201) {
        const { product } = data;
        dispatchAppData({ type: action, payload: product });
        setLoading(false);
      }
    }
  };

  return (
    <button className={btnClass} onClick={onButtonClick}>
      {isLoading ? (
        <Loader
          type="Bars"
          color={type === "REMOVE" ? "#FFF" : "#76B900"}
          width={24}
          height={24}
        />
      ) : (
        svg
      )}
    </button>
  );
};

export { WishListButton };
