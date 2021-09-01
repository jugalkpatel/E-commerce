import { Link } from "react-router-dom";

import "./NoResults.css";
import gpu from "../../assets/svgs/gpu.svg";

const NoResults = ({ mainText, subText, redirect }) => {
  return (
    <div className="nr">
      <article className="nr__img__container">
        <img src={gpu} className="nr__img" alt="no results" />
      </article>
      <h3 className="nr__maintext">{mainText}</h3>
      <span className="nr__subtext">{subText}</span>
      {redirect && (
        <Link to="/" className="nr__redirectbtn">
          SHOP NOW
        </Link>
      )}
    </div>
  );
};

export { NoResults };
