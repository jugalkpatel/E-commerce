import { Link } from "react-router-dom";

import "./ScrollCard.css";

const ScrollCard = ({ details }) => {
  const { _id, name, image, price } = details;
  return (
    <Link to={`/product/${_id}`} className="sc">
      <article className="sc__ibox">
        <img src={image} alt="product_img" className="sc__img" />
      </article>
      <article className="sc__details">
        <h3 className="sc__title">{name}</h3>
        <p className="sc__price">
          <span className="sc__symbol">$</span>
          {price}
        </p>
      </article>
    </Link>
  );
};

export { ScrollCard };
