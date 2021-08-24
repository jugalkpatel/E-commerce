import { actions } from "../../utils/actions";
const { LOW_TO_HIGH, HIGH_TO_LOW, EXCLUDE_OUT_OF_STOCK, RESET_FILTERS } =
  actions;

const filterReducer = (state, { type, payload }) => {
  switch (type) {
    case LOW_TO_HIGH:
      return { ...state, byLowest: payload.flag, byHighest: "" };
    case HIGH_TO_LOW:
      return { ...state, byLowest: "", byHighest: payload.flag };
    case EXCLUDE_OUT_OF_STOCK:
      return {
        ...state,
        byAvailability: state.byAvailability ? "" : payload.flag,
      };
    case RESET_FILTERS:
      return { ...state, byLowest: "", byHighest: "", byAvailability: "" };
    default:
      return state;
  }
};

export { filterReducer };
