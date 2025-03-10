import { useEffect, useState } from 'react';

const SELECTION_API_BASE_URL = 'http://3.39.23.207:3000/api/selections';

export default function useFetchMySelection(id) {
  const [cancelStartup, setCancelStartup] = useState(null);
  const [beforeSelection, setBeforeSelection] = useState(null);

  const fetchCancelMySelection = async (id) => {
    const sessionId = sessionStorage.getItem('sessionId');
    try {
      const response = await fetch(
        `${SELECTION_API_BASE_URL}/cancel-my-startups`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id,
            sessionId: sessionId
          })
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCancelStartup(data.cancelStartup);
      setBeforeSelection(data.beforeSelection);
    } catch (err) {
      console.error('Failed to fetch startups', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCancelMySelection();
    }
  }, [id]);

  return {
    cancelStartup,
    beforeSelection,
    fetchCancelMySelection
  };
}
