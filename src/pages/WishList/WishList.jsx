import React from "react";

import "./WishList.css";

import { useAppData } from "../../contexts";
import { NoResults } from "../../components/NoResults/NoResults";
import { WishListCard } from "../../components";

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
