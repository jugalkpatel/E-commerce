import React from "react";
import "./ProductCard.css";
import closeBtn from "../../assets/svgs/close-btn.svg";
import bookmark from "../../assets/svgs/bookmark.svg";
import arrow from "../../assets/svgs/right-arrow.svg";
import { capitalize } from "../../utils/capitalize";
import { useAppData } from "../../contexts/AppDataProvider";
import { isItemInList } from "../../utils/isItemInList";
import { labels } from "../../utils/labels";
import { Link } from "react-router-dom";
const ProductCard = ({ productDetails }) => {
    const {
        id,
        name,
        imageUrl,
        specifications,
        price,
        availability
    } = productDetails;
    const { appData: { cartData, wishListData }, dispatchAppData } = useAppData();
    const { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = labels;
    return (
        <div className="product-container">
            <a href="#" className="product-info">
                <span className="product__img__container">
                    <button className="close-btn">
                        <img src={closeBtn} alt="close_btn" />
                    </button>
                    <img
                        className="product-img product-info__img"
                        src={imageUrl}
                        alt="product"
                    />
                    <button
                        className="wish-btn"
                        onClick={
                            isItemInList(wishListData, id)
                                ? () => dispatchAppData({ type: REMOVE_FROM_WISHLIST, payload: { data: id } })
                                : () => dispatchAppData({ type: ADD_TO_WISHLIST, payload: { data: productDetails } })
                        }

                    >
                        <svg version="1.1" width="24" height="24" x="0" y="0" viewBox="0 0 330 330" style={{ enableBackground: "new 0 0 512 512" }} className="">
                            <g>
                                <path d="M265,0H65c-8.284,0-15,6.716-15,15v300c0,5.766,3.305,11.022,8.502,13.52c5.197,2.498,11.365,1.796,15.868-1.807L165,254.21  l90.63,72.503c2.712,2.17,6.027,3.287,9.372,3.287c2.208,0,4.43-0.487,6.496-1.48c5.197-2.497,8.502-7.753,8.502-13.52V15  C280,6.716,273.284,0,265,0z M250,283.79l-75.63-60.503c-2.739-2.191-6.055-3.287-9.37-3.287s-6.631,1.096-9.37,3.287L80,283.79V30  h170V283.79z" fill="#b9b9b9" className=""
                                    style={{ fill: "#b6b6b6" }} />
                            </g>
                        </svg>
                    </button>
                </span>
                <span className="product-info__text">
                    {name.toUpperCase()}
                </span>
                <span className="product-info__specifications">
                    <ul className="specifications__list">
                        {
                            Object.keys(specifications).map((spec, index) => {
                                return (
                                    /**
                                     * TODO: decide what should be key here later
                                     **/
                                    <li className="specifications__list__item" key={index}>
                                        <img className="specifications__arrow" src={arrow} alt="right_arrow" />
                                        {capitalize(spec)}: {capitalize(specifications[spec])}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </span>

                <span className="price-tag">${price}</span>
            </a>
            {
                isItemInList(cartData, id)
                    ? <Link to="/cart" className="primary-btn">GO TO CART</Link>
                    : <button
                        className="primary-btn"
                        onClick={
                            () => dispatchAppData({
                                type: ADD_TO_CART,
                                payload: { data: { ...productDetails, quantity: 1 } }
                            })
                        }>
                        ADD TO CART
                      </button>
            }
            {
                !availability ? <div className="overlay-div">
                    <span className="overlay-text"> OUT OF STOCK </span>
                </div> : null
            }
        </div>
    )
}

export { ProductCard }