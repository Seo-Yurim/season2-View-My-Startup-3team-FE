import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.39.23.207:3000'
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(
      '주의 : 에러 발생!',
      err.response ? err.response.data : err.message
    );
    throw err;
  }
);

export default instance;
