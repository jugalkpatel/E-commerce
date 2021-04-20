import React, { useState } from "react";
import "./FilterBar.css";
import downArrow from "../assets/svgs/down-arrow.svg";
const FilterBar = () => {
    const [visibility, setVisibility] = useState("hidden");
    return (
        <div className="filterbar">
            <div className="filterbar__sortby">
                <span className="filterbar__sortby__text">
                    Sort By:
                </span>
                <div class="dropdown">
                    <button class="dropdown__button__primary" onClick={
                        () => setVisibility(
                            (prev) => {
                                return prev === "hidden" ? "visible" : "hidden"
                            })
                    }
                    >
                        <span>Hover Me!</span>
                        <img src={downArrow} alt="down arrow" className="dropdown__downarrow" />
                    </button>

                    <ul class="dropdown__list" style={{ visibility: visibility }}>
                        <li class="dropdown__item">
                            <a href="#" class="dropdown__item__link"
                                onClick={() => console.log("first item clicked")}>Lowest Price</a>
                        </li>
                        <li class="dropdown__item">
                            <a href="#" className="dropdown__item__link"
                                onClick={() => console.log("second item clicked")}
                            >Highest Price</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="filterbar__view">

            </div>
        </div>
    )
}

export { FilterBar };