import React from "react";
import { Link } from "react-router-dom";

import "./WishList.css";

import { WishListCard } from "../../components/ProductCard/WishListCard";
import { useAppData } from "../../contexts";
import { NoResults } from "../../components/NoResults/NoResults";

const WishList = () => {
  const { wishListData } = useAppData();
  return (
    <div className="wishlist">
      {wishListData.length > 0 ? (
        wishListData.map((product) => {
          return <WishListCard productDetails={product} key={product._id} />;
        })
      ) : (
        <NoResults
          mainText="Empty Wishlist"
          subText="You have no items in your wishlsit stard adding!"
          redirect
        />
      )}
    </div>
  );
};

export { WishList };
