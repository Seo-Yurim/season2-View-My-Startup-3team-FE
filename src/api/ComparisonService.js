import { get } from './method';

// 전체 스타트업 조회
export async function getStartupList({ page, limit, keyword }) {
  const res = await get('/comparisons', { page, limit, keyword });
  return res.data;
}

// 최근 선택된 스타트업 목록 조회
export async function getRecentSelection() {
  const res = await get('/recent-selection');
  return res.data;
}

// 선택한 스타트업 비교 결과 조회
export async function getCompareResult({ sessionId, orderBy, sortBy }) {
  const res = await get('/compare-result', { sessionId, orderBy, sortBy });
  return res.data;
}
