import React, { useState } from "react";

import "./FilterBar.css";
import downArrow from "../../assets/svgs/down-arrow.svg";

import { actions } from "../../utils/actions";

const FilterBar = ({ setFilters }) => {
  const [visibility, setVisibility] = useState("hidden");
  const { LOW_TO_HIGH, HIGH_TO_LOW } = actions;
  return (
    <div className="filterbar">
      <div className="filterbar__content">
        <span className="filterbar__text">Sort By:</span>
        <div className="filterbar__dropdown">
          <button
            className="filterbar__dropdown__btn"
            onClick={() =>
              setVisibility((prev) => {
                return prev === "hidden" ? "visible" : "hidden";
              })
            }
          >
            <span>Price</span>
            <img
              src={downArrow}
              alt="down arrow"
              className="filterbar__dropdown__downarrow"
            />
          </button>

          <ul className="fb__list" style={{ visibility: visibility }}>
            <li className="fb__list__item">
              <button
                className="filterbar__dropdown__btn--low"
                onClick={() => setFilters({ type: LOW_TO_HIGH })}
              >
                Lowest Price
              </button>
            </li>
            <li className="fb__list__item">
              <button
                className="filterbar__dropdown__btn--high"
                onClick={() => setFilters({ type: HIGH_TO_LOW })}
              >
                Highest Price
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="filterbar__view"></div>
    </div>
  );
};

export { FilterBar };
