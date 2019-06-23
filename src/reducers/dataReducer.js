import { FETCH_HAULS, FETCH_HAUL } from "../actions/types";

export default (state = "loading", action) => {
  switch (action.type) {
    case FETCH_HAULS:
      return action.payload;
    case FETCH_HAUL: 
      return action.payload;
    default:
      return state;
  }
};
