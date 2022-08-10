import React, { useState, useEffect } from "react";
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
  const { addToast } = useToast();
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

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const onButtonClick = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!isLoading) {
      if (!isLoggedIn) {
        navigate("/login");
        return;
      }

      const { data, status } = await postAPI(url, payload);
      const toastMessage = !isInWishList
        ? "Item added to wishlist"
        : "Item Successfully removed from wishlist";
      const errorMessage = !isInWishList
        ? "Error while adding item to the wishlist"
        : "Error while removing item from wishlist";

      if (status === 201) {
        const { product } = data;
        setLoading(false);
        dispatchAppData({ type: action, payload: product });
        addToast(toastMessage, "success");
        return;
      }

      setLoading(false);
      addToast(errorMessage, "error");
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
