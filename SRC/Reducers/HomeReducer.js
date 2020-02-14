import {GET_CITIES, GET_HOTELS, SEARCHCITY} from '../Constants';
import {HomeStates} from '../States/index';

const HomeReducer = (state = HomeStates, action) => {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case GET_HOTELS:
      return {
        ...state,
        hotels: action.payload,
      };
    case SEARCHCITY:
      return {
        ...state,
        currentCity: action.payload,
      };
  }
  return state;
};
export default HomeReducer;
