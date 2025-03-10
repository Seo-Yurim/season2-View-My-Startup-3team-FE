const STARTUP_API_BASE_URL = 'http://3.39.23.207:3000/api/startups';

// Article 목록 가져오기
export async function getStartupList(
  page = 1,
  limit = 10,
  order = 'simInvest',
  sort = 'desc',
  keyword = ''
) {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      order,
      sort,
      keyword
    });
    const response = await fetch(
      `${STARTUP_API_BASE_URL}?${params.toString()}`
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errMessage', errorMessage);
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
