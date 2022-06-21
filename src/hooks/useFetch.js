import { useEffect, useState } from "react";

function useFetch(url = "", options) {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(url, options)
      .then((response) => {
        if (response.status === 200) return response.json();
        else setError(`Error status: ${response.status}`);
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(<p>Failed to fetch data</p>);
      })
      .finally(() => setLoading(false));
  }, [url]);
  return [data, loading, error];
}
export default useFetch;
