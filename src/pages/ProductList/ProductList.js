import React, { useReducer, useState } from "react";

import filterIcon from "../../assets/svgs/filter.svg";
import Loader from "react-loader-spinner";
import "./ProductList.css";

import { useAppData } from "../../contexts";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { FilterBar } from "../../components/FilterBar/FilterBar";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Filter } from "../../components/Filter/Filter";
import { CheckBox } from "../../components/CheckBox/CheckBox";
import { filterReducer } from "./filterReducer";
import { getSortedProducts } from "../../utils/getSortedProducts";
import { actions } from "../../utils/actions";

const ProductList = () => {
  const { EXCLUDE_OUT_OF_STOCK, BY_MANUFACTURERS } = actions;
  const [visibility, setVisibility] = useState("hidden");

  const initialFilters = {
    byPrice: "",
    byAvailability: "",
    byManufacturers: [],
  };

  const [filters, dispatchFilters] = useReducer(filterReducer, initialFilters);

  const { productsData, manufacturers } = useAppData();

  const filteredProducts =
    productsData.length > 0 ? getSortedProducts(productsData, filters) : null;

  return (
    <>
      {filteredProducts ? (
        <div className="ct--pl">
          <div className="pl">
            <FilterBar setFilters={dispatchFilters} />
            {filteredProducts.map((product, index) => {
              return <ProductCard productDetails={product} key={index} />;
            })}
          </div>

          <Sidebar
            status={{ visibility, setVisibility }}
            setFilters={dispatchFilters}
          >
            <Filter filterTitle="Availability">
              <CheckBox
                filterName="Exclude out of stock"
                filterType={EXCLUDE_OUT_OF_STOCK}
                filterValue={null}
                setFilters={dispatchFilters}
                check={filters.byAvailability}
              />
            </Filter>

            <Filter filterTitle="Manufacturer">
              {manufacturers.map(({ _id, manufacturer }) => (
                <CheckBox
                  key={_id}
                  filterName={manufacturer}
                  filterType={BY_MANUFACTURERS}
                  setFilters={dispatchFilters}
                  check={filters.byManufacturers.find(
                    (company) => company === manufacturer
                  )}
                />
              ))}
            </Filter>
          </Sidebar>

          <button
            className="pl__filterbtn"
            onClick={() =>
              setVisibility((prevStatus) => {
                return prevStatus === "hidden" ? "visible" : "hidden";
              })
            }
            style={{
              visibility: visibility === "hidden" ? "visible" : "hidden",
            }}
          >
            <span className="pl__filterbtn__icon">
              <img src={filterIcon} alt="filter icon" />
            </span>
            <span className="pl__filterbtn__text">FILTER</span>
          </button>
        </div>
      ) : (
        <span className="pl__spinner">
          <Loader type="Oval" color="#b9b9b9" height={100} width={100} />
        </span>
      )}
    </>
  );
};

export { ProductList };
