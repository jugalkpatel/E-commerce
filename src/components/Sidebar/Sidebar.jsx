import React from "react";

import "./Sidebar.css";
import closeBtn from "../../assets/svgs/close-btn.svg";

import { actions } from "../../utils/actions";

const Sidebar = ({
  status: {
    visibility: sidebarVisibility,
    setVisibility: changeSidebarVisibility,
  },
  setFilters,
  children,
}) => {
  const { RESET_FILTERS } = actions;

  return (
    <div className="sidebar" style={{ visibility: sidebarVisibility }}>
      <article className="sidebar__content">
        <button
          className="sidebar__btn--close"
          onClick={() => changeSidebarVisibility("hidden")}
        >
          <span className="sidebar__icon--close">
            <img src={closeBtn} alt="close_icon" />
          </span>
        </button>

        <button
          className="sidebar__btn--reset"
          onClick={() => setFilters({ type: RESET_FILTERS })}
        >
          <span className="sidebar__btn__text--reset">RESET FILTERS</span>
        </button>

        {children}
      </article>
    </div>
  );
};

export { Sidebar };
