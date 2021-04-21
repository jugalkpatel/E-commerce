import React from "react";
import "./Sidebar.css";
import closeBtn from "../../assets/svgs/close-btn.svg";
import { sideBarData } from "./sidebarData";
import { capitalize } from "../../utils/capitalize";
const Sidebar = ({ status: { visibility: sidebarVisibility, setVisibility: changeSidebarVisibility } }) => {
    return (
        <div className="sidebar" style={{ visibility: sidebarVisibility }}>
            <div className="sidebar__content">
                <button className="sidebar__content__close" onClick={() => changeSidebarVisibility("hidden")}>
                    <span className="sidebar__content__close__icon">
                        <img src={closeBtn} alt="close icon" />
                    </span>
                </button>
                <button className="sidebar__content__reset">
                    <span className="sidebar__content__reset__text">
                        RESET FILTERS
                    </span>
                </button>
                {
                    sideBarData.map((filter) => {
                        return (
                            <div className="sidebar__content__product-category" key={filter.filterTitle}>
                                <h3 className="sidebar__content__product-category__title">
                                    <span className="sidebar__content__product-category__title__text">{capitalize(filter.filterTitle)}</span>
                                </h3>
                                <ul className="sidebar__content__product-category__list">
                                    {
                                        filter.filterData.map((item) => {
                                            return (
                                                <li className="sidebar__content__product-category__list__item"
                                                    key={item.filterLabel}
                                                >
                                                    <input type="checkbox" id={item.filterLabel} onChange={() => console.log(`${item.filterLabel} clicked`)} />
                                                    <label htmlFor={item.filterLabel} className="checkbox__text">{capitalize(item.filterName)}</label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
                {
                    sideBarData.map((filter) => {
                        return (
                            <div className="sidebar__content__product-category" key={filter.filterTitle}>
                                <h3 className="sidebar__content__product-category__title">
                                    <span className="sidebar__content__product-category__title__text">{capitalize(filter.filterTitle)}</span>
                                </h3>
                                <ul className="sidebar__content__product-category__list">
                                    {
                                        filter.filterData.map((item) => {
                                            return (
                                                <li className="sidebar__content__product-category__list__item"
                                                    key={item.filterLabel}
                                                >
                                                    <input type="checkbox" id={item.filterLabel} onChange={() => console.log(`${item.filterLabel} clicked`)} />
                                                    <label htmlFor={item.filterLabel} className="checkbox__text">{capitalize(item.filterName)}</label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export { Sidebar };