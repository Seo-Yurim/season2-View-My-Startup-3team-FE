import { get } from './method';

// 스타트업 목록 가져오기
export async function getStartupList({ page, limit, order, sort, keyword }) {
  const res = await get('/startups', { page, limit, order, sort, keyword });
  return res.data;
}

// 특정 스타트업 순위 목록 가져오기
export async function getRankedStartupList(id, { order, sort }) {
  const res = await get(`/startups/${id}/rank`, { order, sort });
  return res.data;
}

// 스타트업 상세 정보 가져오기 + 투자자 목록
export async function getStartupDetail(id, { page, limit }) {
  const res = await get(`/startups/${id}`, { page, limit });
  return res.data;
}
