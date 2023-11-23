import { useState, useEffect } from 'react';

function useFetchData(urls) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const dataPromises = responses.map(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        });
        const results = await Promise.all(dataPromises);
        setData(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [urls]); // Dependency array ensures this runs only if URLs array changes

  return { data, loading, error };
}

export default useFetchData;
