import { useState, useCallback } from 'react';

type Header = { 'Content-Type': string };
interface RQConfig {
  url: string;
  method: string;
  body: any;
  headers: Header;
}
const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(async (requestConfig: RQConfig, applyData: (param: any) => void) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (!response.ok) {
        setError('Request failed!');
        throw new Error('Request failed!');
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      console.log(err);
      setError('Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
