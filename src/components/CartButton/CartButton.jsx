import React, { useState, useEffect } from "react";
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
  const { addToast } = useToast();
  const { type, btnClass, payload, svg } = data;
  const navigate = useNavigate();

  const isProductInCart = isItemInList(cartData, payload.id);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

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
      const toastMessage = isProductInCart
        ? "Item Successfully removed from your cart"
        : "Item added to cart";
      const errorMessage = isProductInCart
        ? "Error while adding item to cart"
        : "Error while removing item cart";
      const { data, status } = await postAPI(url, payload);

      if (status === 201) {
        const { product, availableQuantity } = data;
        setLoading(false);
        dispatchAppData({
          type: action,
          payload: { product, availableQuantity },
        });
        addToast(toastMessage, "success");
        return;
      }

      setLoading(false);
      addToast(errorMessage, "error");
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
        <Loader type="Bars" color="#FFF" width={16} height={16} />
      ) : (
        <>
          {svg && svg} {btnText}
        </>
      )}
    </button>
  );
};

export { CartButton };
