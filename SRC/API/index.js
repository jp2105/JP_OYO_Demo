import axios from 'axios';
export const Api = (url1, data, method) => {
  // let mainUrl = 'http://localhost:3000';
  let mainUrl = 'http://db7002ba.ngrok.io';
  let url = mainUrl + '/data' + url1;
  switch (method) {
    case 'get':
      return axios
        .get(url)
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err);
          return err;
        });
    case 'post':
      return axios
        .post(url, data)
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log(err);
          return err;
        });
  }
};
