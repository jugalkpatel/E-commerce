import React, { useState } from "react";
import "./FilterBar.css";
import downArrow from "../assets/svgs/down-arrow.svg";
import { label } from "../utils/labels";
const FilterBar = ({
    setFilter
}) => {
    const [visibility, setVisibility] = useState("hidden");
    return (
        <div className="filterbar">
            <div className="filterbar__sortby">
                <span className="filterbar__sortby__text">
                    Sort By:
                </span>
                <div className="dropdown">
                    <button className="dropdown__button__primary" onClick={
                        () => setVisibility(
                            (prev) => { return prev === "hidden" ? "visible" : "hidden" })
                    }
                    >
                        <span>Price</span>
                        <img src={downArrow} alt="down arrow" className="dropdown__downarrow" />
                    </button>

                    <ul className="dropdown__list" style={{ visibility: visibility }}>
                        <li className="dropdown__item">
                            <a href="#" className="dropdown__item__link"
                                onClick={() => setFilter({
                                    type: label.LOW_TO_HIGH,
                                    payload: { flag: label.LOW_TO_HIGH }
                                })}>Lowest Price</a>
                        </li>
                        <li className="dropdown__item">
                            <a href="#" className="dropdown__item__link"
                                onClick={() => setFilter({
                                    type: label.HIGH_TO_LOW,
                                    payload: { flag: label.HIGH_TO_LOW }
                                })}
                            >Highest Price</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="filterbar__view">

            </div>
        </div >
    )
}

export { FilterBar };