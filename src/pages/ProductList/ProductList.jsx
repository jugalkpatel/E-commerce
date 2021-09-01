import React, { useReducer, useState } from "react";

import "./ProductList.css";
import filterIcon from "../../assets/svgs/filter.svg";

import { useAppData } from "../../contexts";

import {
  Sidebar,
  FilterBar,
  ProductCard,
  Filter,
  Spinner,
  CheckBox,
  NoResults,
} from "../../components";
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

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => {
                return <ProductCard productDetails={product} key={index} />;
              })
            ) : (
              <NoResults
                mainText="No results found!"
                subText="Please reset filters."
                redirect={false}
              />
            )}
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
        <Spinner />
      )}
    </>
  );
};

export { ProductList };
