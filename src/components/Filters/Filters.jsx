import { useAppData } from "../../contexts";
import "./Filters.css";
import { capitalize } from "../../utils/capitalize";
const Filters = ({ setFilter }) => {
  const { manufacturers } = useAppData();
  const filters = [
    {
      filterTitle: "Availability",
      filterNames: ["Exclude out of stock"],
      flag: "BY_AVAILABILITY",
    },
    {
      filterTitle: "manufacturers",
      filterNames: manufacturers.map(({ manufacturer }) => manufacturer),
      flag: "BY_MANUFACTURERS",
    },
  ];
  return (
    <>
      {filters.map(({ filterTitle, filterNames, flag }) => {
        return (
          <div className="filter">
            <h3 className="filter__title">
              <span className="filter__title__text">
                {capitalize(filterTitle)}
              </span>
            </h3>
            {filterNames.map((name, index) => (
              <article className="checkbox__container">
                <input
                  type="checkbox"
                  id={index}
                  onChange={() =>
                    setFilter({ type: flag, payload: { flag, value: name } })
                  }
                />
                <label htmlFor={index} className="checkbox__text">
                  {capitalize(name)}
                </label>
              </article>
            ))}
          </div>
        );
      })}
    </>
  );
};

export { Filters };
