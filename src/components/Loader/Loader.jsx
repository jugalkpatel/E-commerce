import "./Spinner.css";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="loader">
      <Loader type="Oval" color="#b9b9b9" height={100} width={100} />
    </div>
  );
};

export { Spinner };
