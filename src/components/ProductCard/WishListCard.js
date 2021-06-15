import React from 'react';
import { Link } from 'react-router-dom';
import './WishListCard.css';

import close from '../../assets/svgs/close-btn.svg';

import { useAppData } from '../../contexts/AppDataProvider';
import { constants } from '../../utils/constants';
import { urlList } from '../../utils/urlList';
import { isItemInList } from '../../utils/isItemInList';

const WishListCard = ({ productDetails }) => {
  const { _id, name, image, price } = productDetails;
  const {
    dispatchAppData,
    handleAPIOperations,
    appData: { cartData },
  } = useAppData();
  const { REMOVE_FROM_WISHLIST, ADD_TO_CART } = constants;
  const { REMOVE_ITEM_FROM_WISHLIST, ADD_ITEM } = urlList;
  return (
    <a href="#" className="wishlist__product" key={_id}>
      <button
        className="wishlist__product__remove"
        onClick={() =>
          handleAPIOperations(
            REMOVE_ITEM_FROM_WISHLIST,
            { id: _id },
            dispatchAppData,
            REMOVE_FROM_WISHLIST
          )
        }
      >
        <img src={close} alt="close_icon" />
      </button>
      <div className="wishlist__product__imgcontainer">
        <img src={image} alt="product_img" className="wishlist__product__img" />
      </div>
      <div className="wishlist__product__details">
        <span className="wishlist__product__details__title">{name}</span>
        <span className="wishlist__product__details__price">$ {price}</span>
        {isItemInList(cartData, _id) ? (
          <Link to="/cart" className="primary-btn">
            GO TO CART
          </Link>
        ) : (
          <button
            className="primary-btn"
            onClick={() =>
              handleAPIOperations(
                ADD_ITEM,
                { id: _id },
                dispatchAppData,
                ADD_TO_CART
              )
            }
          >
            ADD TO CART
          </button>
        )}
      </div>
    </a>
  );
};

export { WishListCard };
