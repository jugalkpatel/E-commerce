import "./Filter.css";

import { capitalize } from "../../utils/capitalize";

const Filter = ({ filterTitle, children }) => {
  return (
    <div className="filter">
      <h3 className="filter__title">
        <span className="filter__title__text">{capitalize(filterTitle)}</span>
      </h3>

      {children}
    </div>
  );
};

export { Filter };
