import {Api} from '../API/index';
import {SEARCHCITY, SETPROFILE, COUNTRYCODE} from '../Constants';
import axios from 'axios';
export const _setProfile = data => {
  let url = '/user/' + data.phone;
  return dispatch => {
    if (data) {
      return Api(url, data, 'post')
        .then(res => {
          dispatch({
            type: SETPROFILE,
            payload: res.data,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return dispatch({
        type: SETPROFILE,
        payload: null,
      });
    }
  };
};

export const _getProfile = data => {
  let url = '/getUser';
  return dispatch => {
    return Api(url, data, 'post')
      .then(res => {
        dispatch({
          type: SETPROFILE,
          payload: res.data,
        });
        return Promise.resolve(res.date);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const _CountryCode = () => {
  let url1 = 'https://restcountries.eu/rest/v2/all';
  return dispatch => {
    return axios
      .get(url1)
      .then(res => {
        dispatch({
          type: COUNTRYCODE,
          payload: res,
        });
        return Promise.resolve(res);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };
};
