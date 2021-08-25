import React, { useState } from "react";
import { useNavigate } from "react-router";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Loader from "react-loader-spinner";

import { useAppData, useAuthData, useToast } from "../../contexts";
import { isItemInList } from "../../utils/isItemInList";
import { actions } from "../../utils/actions";
import { postAPI } from "../../utils/postAPI";

const WishListButton = ({ data }) => {
  const [isLoading, setLoading] = useState(false);
  const { type, btnClass, svgClass, payload } = data;
  const { wishListData, dispatchAppData } = useAppData();
  const { setupToast } = useToast();
  const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = actions;

  const { isLoggedIn, userID } = useAuthData();

  const navigate = useNavigate();

  const isInWishList = isItemInList(wishListData, payload.id);

  const action = !isInWishList ? ADD_TO_WISHLIST : REMOVE_FROM_WISHLIST;

  const url = !isInWishList
    ? `/user/${userID}/wishlist/add`
    : `/user/${userID}/wishlist/remove`;

  const svg = !isInWishList ? (
    <FaRegBookmark className={svgClass} />
  ) : type === "REMOVE" ? (
    <IoMdClose className={svgClass} />
  ) : (
    <FaBookmark className={svgClass} />
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
        setLoading(false);
        dispatchAppData({ type: action, payload: product });
        return;
      }

      setLoading(false);
      setupToast("error while adding to the wishlist....");
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
