import { get, post, patch, remove } from './method';

// 전체 투자 목록 조회
export async function getInvestmentList({ page, limit, order, sort }) {
  const res = await get(`/investments`, { page, limit, order, sort });
  return res.data;
}

// 투자하기
export async function createInvestment(investment) {
  const res = await post(`/investments`, investment);
  return res.data;
}

// 투자 수정
export async function patchInvestment(id, investment) {
  const res = await patch(`/investments/${id}`, investment);
  return res;
}

// 투자 삭제
export async function deleteInvestment(id) {
  const res = await remove(`/investments/${id}`);
  return res;
}
