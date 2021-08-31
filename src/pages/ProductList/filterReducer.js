import { actions } from "../../utils/actions";
const {
  LOW_TO_HIGH,
  HIGH_TO_LOW,
  EXCLUDE_OUT_OF_STOCK,
  BY_MANUFACTURERS,
  RESET_FILTERS,
} = actions;

// const filterReducer = (state, { type, payload }) => {
//   switch (type) {
//     case LOW_TO_HIGH: {
//       const isAlreadyInFilters = checkFilters(state.filterList, type);
//       return {
//         ...state,
//         filterList: isAlreadyInFilters
//           ? state.filterList.filter(({ filterType }) => type !== filterType)
//           : state.filterList.concat({ filterType: type, value: payload.value }),
//       };
//     }
//     case HIGH_TO_LOW: {
//       const isAlreadyInFilters = checkFilters(state.filterList, type);
//       return {
//         ...state,
//         filterList: isAlreadyInFilters
//           ? state.filterList.filter(({ filterType }) => type !== filterType)
//           : state.filterList.concat({ filterType: type, value: payload.value }),
//       };
//     }
//     case BY_AVAILABILITY: {
//       const isAlreadyInFilters = checkFilters(state.filterList, type);
//       return {
//         ...state,
//         filterList: isAlreadyInFilters
//           ? state.filterList.filter(({ filterType }) => type !== filterType)
//           : state.filterList.concat({ filterType: type, value: payload.value }),
//       };
//     }
//     case BY_MANUFACTURERS: {
//       const isAlreadyInFilters = state.filterList.find(
//         ({ value }) => value === payload.value
//       );
//       return {
//         ...state,
//         filterList: isAlreadyInFilters
//           ? state.filterList.filter(({ value }) => value !== payload.value)
//           : state.filterList.concat({ filterType: type, value: payload.value }),
//       };
//     }
//     case RESET_FILTERS: {
//       return {
//         ...state,
//         filterList: [],
//       };
//     }
//     default:
//       return state;
//   }
// };

const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case LOW_TO_HIGH:
      return { ...state, byPrice: type };
    case HIGH_TO_LOW:
      return { ...state, byPrice: type };
    case EXCLUDE_OUT_OF_STOCK:
      return { ...state, byAvailability: state.byAvailability ? "" : type };
    case BY_MANUFACTURERS:
      const isAlreadyInArray = state.byManufacturers.find(
        (company) => company === payload.company
      );
      return {
        ...state,
        byManufacturers: isAlreadyInArray
          ? state.byManufacturers.filter(
              (company) => company !== payload.company
            )
          : state.byManufacturers.concat(payload.company),
      };
    case RESET_FILTERS:
      return { ...state, byPrice: "", byAvailability: "", byManufacturers: [] };
    default:
      return state;
  }
};

export { filterReducer };
