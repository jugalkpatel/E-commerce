import "./Filter.css";
import { capitalize } from "../../utils/capitalize";

const Filter = ({ filterTitle, children }) => {
  return (
    <div className="filter">
      <h3 className="filter__title">
        <span className="filter__title__text">{capitalize(filterTitle)}</span>
      </h3>

      {children}
      {/* <article className="filter__checkbox__container">
        {filterNames.map(({ name }) => {
          return (
            <>
              <input type="checkbox" id={name} />
              <label htmlFor={name} className="checkbox__text">
                {capitalize(name)}
              </label>
            </>
          );
        })}
      </article> */}
    </div>
  );
};

export { Filter };
