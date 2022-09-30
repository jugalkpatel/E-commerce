import { useAppData } from "../../contexts";

import "./ScrollList.css";

import { ScrollCard } from "..";

const ScrollList = ({ id, manufacturer }) => {
  const { productsData } = useAppData();
  const products = productsData.filter(
    (product) => product.manufacturer === manufacturer && product._id !== id
  );
  return (
    <div className="sl">
      {products &&
        products.map((product) => {
          return <ScrollCard key={product._id} details={product} />;
        })}
    </div>
  );
};

export { ScrollList };
