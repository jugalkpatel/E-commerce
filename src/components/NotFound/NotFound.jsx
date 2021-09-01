import not_found from "../../assets/svgs/not_found.svg";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="notfound">
      <article className="notfound__cover">
        <img src={not_found} alt="not found" className="notfound__img" />
      </article>
      <article className="notfound__content">
        <p className="notfound__content__text">Oops... page not found.</p>
      </article>
    </div>
  );
};

export { NotFound };
