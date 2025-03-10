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

async function get(url, params = {}) {
  return await instance.get(url, { params });
}

async function post(url, body) {
  return instance.post(url, body);
}

async function patch(url, body) {
  return instance.patch(url, body);
}

async function remove(url, body) {
  return instance.delete(url, body);
}

export async function getInvestmentList({ page, limit, orderBy }) {
  const res = await get(`/api/investments`, { page, limit, orderBy });
  return res.data;
}

export async function createInvestment(investment) {
  const res = await post(`/api/investments`, investment);
  return res.data;
}

export async function patchInvestment(id, investment) {
  const res = await patch(`/api/investments/${id}`, investment);
  return res;
}

export async function deleteInvestment(id) {
  const res = await remove(`/api/investments/${id}`);
  return res;
}
