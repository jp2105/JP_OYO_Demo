import {Api} from '../API/index';
import {GET_CITIES, GET_HOTELS, SEARCHCITY} from '../Constants';
import axios from 'axios';
export const _getCities = () => {
  return dispatch => {
    return Api('/cities', '', 'get')
      .then(res => {
        // console.log(res.data);
        dispatch({
          type: GET_CITIES,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const _getHotels = () => {
  return dispatch => {
    return Api('/hotels', '', 'get')
      .then(res => {
        // console.log(res.data);
        dispatch({
          type: GET_HOTELS,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const _getCurrentCIty = (lat, lon) => {
  let url1 =
    'https://api.opencagedata.com/geocode/v1/json?key=f503962edc364be88392b6620247fc3e&q=' +
    lat +
    '+' +
    lon +
    '&pretty=1';
  return dispatch => {
    return axios
      .get(url1)
      .then(res => {
        dispatch({
          type: SEARCHCITY,
          payload: res.data.results[0].components.city,
        });
        return Promise.resolve(res.data.results[0].components.city);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  };
};

export const _findCity = city => {
  return {
    type: SEARCHCITY,
    payload: city,
  };
};
