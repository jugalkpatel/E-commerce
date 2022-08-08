import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Loader from "react-loader-spinner";

import { actions } from "../../utils/actions";
import { useAuthData, useAppData, useToast } from "../../contexts";
import { postAPI } from "../../utils/postAPI";

const QuantityButton = ({ data }) => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, userID } = useAuthData();
  const { dispatchAppData } = useAppData();
  const { addToast } = useToast();

  const { type, btnClass, payload, quantity } = data;

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const stopPropagation = (e) => e.preventDefault();

  const onButtonClick = async (e) => {
    stopPropagation(e);

    if (!isLoggedIn || !userID) {
      navigate("/login");
      return;
    }

    setLoading(true);

    if (!isLoading) {
      const { INCREMENT_QUANTITY, DECREMENT_QUANTITY } = actions;

      const url =
        type === "INCREMENT"
          ? `/user/${userID}/cart/update/increment`
          : `/user/${userID}/cart/update/decrement`;

      const action =
        type === "INCREMENT" ? INCREMENT_QUANTITY : DECREMENT_QUANTITY;

      const { data, status } = await postAPI(url, payload);

      if (status === 201) {
        const { product, availableQuantity } = data;

        if (availableQuantity < 0) {
          addToast("Item is out of stock", "error");
        }

        setLoading(false);
        dispatchAppData({
          type: action,
          payload: { product, availableQuantity },
        });
        return;
      }

      setLoading(false);
      addToast("Error while updating quantity", "error");
    }
  };

  const svg =
    type === "INCREMENT" ? (
      <AiOutlinePlus className="quantity_icon" />
    ) : (
      <AiOutlineMinus className="quantity_icon" />
    );

  const handleClick =
    quantity === 1 && type === "DECREMENT"
      ? (e) => stopPropagation(e)
      : (e) => onButtonClick(e);

  return (
    <button className={btnClass} onClick={handleClick}>
      {isLoading ? (
        <Loader type="Bars" color="#FFF" width={16} height={16} />
      ) : (
        svg
      )}
    </button>
  );
};

export { QuantityButton };
