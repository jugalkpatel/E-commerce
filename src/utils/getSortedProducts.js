import { actions } from "./actions";

const { LOW_TO_HIGH } = actions;

const getSortedProducts = (productList, filterList) => {
  const localProductsList = [...productList];

  const filteredProductsList = Object.keys(filterList).reduce((acc, filter) => {
    switch (filter.toUpperCase()) {
      case "BYPRICE": {
        return filterList[filter]
          ? filterList[filter] === LOW_TO_HIGH
            ? acc.sort(
                (firstItem, secondItem) =>
                  parseInt(firstItem.price) - parseInt(secondItem.price)
              )
            : acc.sort(
                (firstItem, secondItem) =>
                  parseInt(secondItem.price) - parseInt(firstItem.price)
              )
          : acc;
      }
      case "BYAVAILABILITY":
        return filterList[filter]
          ? acc.filter((item) => item.availableQuantity > 0)
          : acc;
      case "BYMANUFACTURERS":
        return filterList[filter].length > 0
          ? acc.filter(({ manufacturer }) =>
              filterList[filter].find(
                (company) =>
                  company.toLowerCase() === manufacturer.toLowerCase()
              )
            )
          : acc;
      default:
        return acc;
    }
  }, localProductsList);

  return filteredProductsList;
};

export { getSortedProducts };
