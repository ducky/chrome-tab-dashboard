import strf from './stringf';

const apiFetch = (urlPath, replaceFormat = {}) => {
  const path = strf(urlPath, replaceFormat);
  return fetch(path).then(res => res.json());
};

export const withQuery = (urlPath, params = {}) => {
  const url = new URL(urlPath);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetch(url).then(res => res.json());
};

export default apiFetch;
