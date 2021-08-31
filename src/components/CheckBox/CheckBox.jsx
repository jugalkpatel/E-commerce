import "./CheckBox.css";
import { capitalize } from "../../utils/capitalize";

const CheckBox = ({ filterName, filterType, setFilters, check }) => {
  return (
    <div className="checkbox__container">
      <input
        type="checkbox"
        id={filterName}
        checked={check || false}
        onChange={() =>
          setFilters({ type: filterType, payload: { company: filterName } })
        }
      />
      <label htmlFor={filterName} className="checkbox__text">
        {capitalize(filterName)}
      </label>
    </div>
  );
};

export { CheckBox };
