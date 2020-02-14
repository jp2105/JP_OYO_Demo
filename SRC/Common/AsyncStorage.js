import AsyncStorage from '@react-native-community/async-storage';
import {LOGIN_ASYNC_STORAGE} from '../Constants';

const _setAsyncStroge = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};
const _removeAsyncStorage = async key => {
  try {
    await AsyncStorage.removeItem(key).then(res => {
      return Promise.resolve(res);
    });
  } catch (e) {
    console.log(e);
  }
};
const _getAsyncStroge = async key => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value != null) {
      return Promise.resolve(JSON.parse(value));
    } else {
      return '';
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  _setAsyncStroge,
  _getAsyncStroge,
  _removeAsyncStorage,
};
