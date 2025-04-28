import { get, post } from './method';

// 세션에 저장된 스타트업 불러오기
export async function getSeletedStartups({ sessionId }) {
  const res = await get('/selections', { sessionId });
  return res.data;
}

// 나의 스타트업 선택
export async function selectMyStartup({ id, sessionId }) {
  const res = await post('/selections/my-startups', { id, sessionId });
  return res.data;
}

// 비교할 기업들 선택
export async function selectCompareStartups({ ids, sessionId }) {
  const res = await post('/selections/comparison-startups', { ids, sessionId });
  return res.data;
}

// 나의 스타트업 선택 취소
export async function cancelMyStartup({ id, sessionId }) {
  const res = await post('/selections/cancel-my-startups', { id, sessionId });
  return res.data;
}

// 비교할 기업 선택 취소
export async function cancelCompareStartups({ ids, sessionId }) {
  const res = await post('/selections/cancel-comparison-startups', {
    ids,
    sessionId
  });
  return res.data;
}
