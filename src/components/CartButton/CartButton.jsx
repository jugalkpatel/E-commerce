import React, { useState } from "react";
import { useNavigate } from "react-router";

import { IoMdClose } from "react-icons/io";
import Loader from "react-loader-spinner";

import { useAuthData, useAppData, useToast } from "../../contexts";
import { isItemInList } from "../../utils/isItemInList";
import { postAPI } from "../../utils/postAPI";
import { actions } from "../../utils/actions";

const CartButton = ({ data }) => {
  const [isLoading, setLoading] = useState(false);
  const { isLoggedIn, userID } = useAuthData();
  const { cartData, dispatchAppData } = useAppData();
  const { setupToast } = useToast();
  const { type, btnClass, payload, svg } = data;
  const navigate = useNavigate();

  const isProductInCart = isItemInList(cartData, payload.id);

  const onButtonClick = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !userID) {
      navigate("/login");
      return;
    }

    setLoading(true);

    if (!isLoading) {
      const { ADD_TO_CART, REMOVE_FROM_CART } = actions;
      const url = !isProductInCart
        ? `/user/${userID}/cart/add`
        : `/user/${userID}/cart/remove`;

      const action = !isProductInCart ? ADD_TO_CART : REMOVE_FROM_CART;

      const { data, status } = await postAPI(url, payload);

      if (status === 201) {
        const { product } = data;
        setLoading(false);
        dispatchAppData({ type: action, payload: product });
        return;
      }

      setLoading(false);
      setupToast("error while performing operation....");
    }
  };

  const btnAction =
    !isProductInCart || type === "REMOVE"
      ? (e) => onButtonClick(e)
      : () => navigate("/cart");

  const btnText = !isProductInCart ? (
    "ADD TO CART"
  ) : type === "REMOVE" ? (
    <IoMdClose className="close_icon" />
  ) : (
    "GO TO CART"
  );

  return (
    <button className={btnClass} onClick={btnAction}>
      {isLoading ? (
        <Loader type="Bars" color="#FFF" width={13} height={13} />
      ) : (
        <>
          {svg && svg} {btnText}
        </>
      )}
    </button>
  );
};

export { CartButton };
