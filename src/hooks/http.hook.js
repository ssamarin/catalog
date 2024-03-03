import md5 from 'md5';

function useHttp() {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const _apiPas = 'Valantis';
  const authString = `${_apiPas}_${timestamp}`.toString();
  const authHeaderValue = md5(authString);
  const request = async (body, url = 'http://api.valantis.store:40000/', method = 'POST', headers = { 'X-Auth': authHeaderValue, 'Content-Type': 'application/json' }) => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  return { request };
}

export default useHttp;
