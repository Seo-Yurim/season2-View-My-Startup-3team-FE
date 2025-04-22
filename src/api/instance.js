import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
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
