import React, { useEffect, useState } from "react";
import axios from "axios";

function useFetch({ url, options }) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  axios.defaults.baseURL = "http://localhost:8080";

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async (url, options) => {
      try {
        const signal = abortController.signal;
        // setAbort(abortController.abort);
        const data = await axios({ ...options, url: url, signal: signal });
        setResponse(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData(url, options);

    return () => {
      abortController.abort();
    };
  }, []);

  return { response, loading, error };
}

export default useFetch;
