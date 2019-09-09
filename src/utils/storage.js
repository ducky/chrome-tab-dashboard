import isEmpty from 'lodash/isEmpty';

const hasChromeStorage = !isEmpty(chrome) && !isEmpty(chrome.storage);

export const get = (key, defaultResponse) => {
  return new Promise(resolve => {
    if (hasChromeStorage) {
      chrome.storage.sync.get(key, item => {
        resolve(item);
      });
    } else {
      const item = localStorage.getItem(key);
      resolve(item ? JSON.parse(item) : defaultResponse);
    }
  });
};

export const set = (key, data = {}) => {
  return new Promise(resolve => {
    if (hasChromeStorage) {
      chrome.storage.sync.set({ key: data }, function() {
        resolve(data);
      });
    } else {
      localStorage.setItem(key, JSON.stringify(data));
      resolve(data);
    }
  });
};
