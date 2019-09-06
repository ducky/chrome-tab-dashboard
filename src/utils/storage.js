export const get = (key, defaultResponse) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultResponse;
};

export const set = (key, data = {}) => {
  localStorage.setItem(key, JSON.stringify(data));
  return data;
};
