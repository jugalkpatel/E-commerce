import React from "react";

import './WishList.css';
import gpu from "../assets/svgs/gpu.svg";

import { WishListCard } from "../components/ProductCard/WishListCard";
import { useAppData } from "../contexts/AppDataProvider";


const WishList = () => {

    const { appData: { wishListData } } = useAppData();
    return (
        <div className="wishlist">
            {
                wishListData.length > 0
                    ? (
                        wishListData.map((product) => {
                            return <WishListCard productDetails={product} key={product.id} />
                        })
                    ) : (
                        <div className="wishlist__empty">
                            <div className="wishlist__empty__imgcontainer">
                                <img src={gpu} alt="gpu" className="wishlist__empty__image" />
                            </div>
                            <h3 className="wishlist__empty__text">
                                Empty Wishlist
                            </h3>
                            <span className="wishlist__empty__subtext">
                                You have no items in your wishlist Start adding!
                            </span>
                            <button className="wishlist__empty__shopbtn">
                                ADD NOW
                            </button>
                        </div>
                    )
            }
        </div>
    )
}

export { WishList }