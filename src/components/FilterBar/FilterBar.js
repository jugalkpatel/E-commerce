import React, { useState } from "react";
import "./FilterBar.css";
import downArrow from "../../assets/svgs/down-arrow.svg";
import { constants } from "../../utils/constants";
const FilterBar = ({ setFilter }) => {
  const [visibility, setVisibility] = useState("hidden");
  const { LOW_TO_HIGH, HIGH_TO_LOW } = constants;
  return (
    <div className="filterbar">
      <div className="filterbar__sortby">
        <span className="filterbar__sortby__text">Sort By:</span>
        <div className="dropdown">
          <button
            className="dropdown__button__primary"
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
              className="dropdown__downarrow"
            />
          </button>

          <ul className="dropdown__list" style={{ visibility: visibility }}>
            <li className="dropdown__item">
              <a
                href="#cart"
                className="dropdown__item__link"
                onClick={() =>
                  setFilter({
                    type: LOW_TO_HIGH,
                    payload: { flag: LOW_TO_HIGH },
                  })
                }
              >
                Lowest Price
              </a>
            </li>
            <li className="dropdown__item">
              <a
                href="#cart"
                className="dropdown__item__link"
                onClick={() =>
                  setFilter({
                    type: HIGH_TO_LOW,
                    payload: { flag: HIGH_TO_LOW },
                  })
                }
              >
                Highest Price
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="filterbar__view"></div>
    </div>
  );
};

export { FilterBar };
