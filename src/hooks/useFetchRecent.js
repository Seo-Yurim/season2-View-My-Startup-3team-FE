import { useEffect, useState } from 'react';

const COMPARISON_API_BASE_URL = 'http://3.39.23.207:3000/api/comparisons';

export default function useFetchRecent() {
  const [recentStartups, setRecentStartups] = useState([]);

  const fetchRecentStartups = async () => {
    try {
      const response = await fetch(
        `${COMPARISON_API_BASE_URL}/recent-selection`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setRecentStartups(data.list);
    } catch (err) {
      console.error('Failed to fetch startups', err);
    }
  };

  useEffect(() => {
    fetchRecentStartups();
  }, []);

  return {
    recentStartups
  };
}
