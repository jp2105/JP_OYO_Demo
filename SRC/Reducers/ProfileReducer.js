import {SETPROFILE,COUNTRYCODE} from '../Constants';
import {UserData} from '../States/index';

const ProfileReducer = (state = UserData, action) => {
  switch (action.type) {
    case SETPROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case COUNTRYCODE:
      return {
        ...state,
        CountryCode: action.payload,
      };
  }
  return state;
};
export default ProfileReducer;
