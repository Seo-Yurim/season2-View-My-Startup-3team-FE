import { get, post, patch, remove } from './method';

export async function getInvestmentList({ page, limit, order, sort }) {
  const res = await get(`/api/investments`, { page, limit, order, sort });
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
