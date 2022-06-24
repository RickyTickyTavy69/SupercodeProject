const useRequest = () => {
  const sendRequest = (method, url, body, headers = {}) => {
    headers["Content-Type"] = "application/json";

    return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });
  };

  return sendRequest;
};

export default useRequest;
