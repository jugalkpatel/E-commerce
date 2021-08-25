import { useState } from "react";
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
  const { setupToast } = useToast();

  const { type, btnClass, payload } = data;

  const onButtonClick = async () => {
    if (!isLoggedIn || !userID) {
      navigate("/login");
      return;
    }

    setLoading(true);

    if (!isLoading) {
      const { SET_QUANTITY } = actions;

      const { data, status } = await postAPI(
        `/user/${userID}/cart/update`,
        payload
      );

      console.log({ data });

      if (status === 201) {
        const { product, quantity } = data;
        setLoading(false);
        dispatchAppData({ type: SET_QUANTITY, payload: { product, quantity } });
        return;
      }

      setLoading(false);
      setupToast("Quantity updation failed....");
    }
  };

  const svg =
    type === "INCREMENT" ? (
      <AiOutlinePlus className="quantity_icon" />
    ) : (
      <AiOutlineMinus className="quantity_icon" />
    );

  return (
    <button className={btnClass} onClick={onButtonClick}>
      {isLoading ? (
        <Loader type="Bars" color="#FFF" width={16} height={16} />
      ) : (
        svg
      )}
    </button>
  );
};

export { QuantityButton };
