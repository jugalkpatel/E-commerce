import { actions } from "./actions";

const { LOW_TO_HIGH, HIGH_TO_LOW, EXCLUDE_OUT_OF_STOCK } = actions;
const getSortedProducts = (list, filterFlags) => {
  const localProductsData = [...list];
  const filteredList = Object.keys(filterFlags).reduce((acc, item) => {
    switch (filterFlags[item]) {
      case LOW_TO_HIGH:
        return acc.sort((firstItem, secondItem) => {
          return parseInt(firstItem.price) - parseInt(secondItem.price);
        });
      case HIGH_TO_LOW:
        return acc.sort((firstItem, secondItem) => {
          return parseInt(secondItem.price) - parseInt(firstItem.price);
        });
      case EXCLUDE_OUT_OF_STOCK:
        return acc.filter((item) => item.quantity > 0);
      default:
        return acc;
    }
  }, localProductsData);
  return filteredList;
};

export { getSortedProducts };
