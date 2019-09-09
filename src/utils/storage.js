import isEmpty from 'lodash/isEmpty';

const hasChromeStorage = !isEmpty(chrome) && !isEmpty(chrome.storage);

export const get = (key, defaultResponse) => {
  return new Promise(resolve => {
    if (hasChromeStorage) {
      chrome.storage.sync.get([key], item => {
        // eslint-disable-next-line
        console.log(`Loading ${key} from Chrome Storage`);

        if (item[key]) {
          const data = JSON.parse(item[key]);
          // eslint-disable-next-line
          console.log(`Loaded ${key} from Chrome Storage`, data);
          resolve(data);
        } else {
          // eslint-disable-next-line
          console.log(`Failed to Load ${key} from Chrome Storage; Loading Default`);
          resolve(defaultResponse);
        }
      });
    } else {
      // eslint-disable-next-line
      console.log(`Loading ${key} from Local Storage`);
      const item = localStorage.getItem(key);

      if (item) {
        const data = JSON.parse(item);
        // eslint-disable-next-line
        console.log(`Loaded ${key} from Local Storage`, data);
        resolve(data);
      } else {
        // eslint-disable-next-line
        console.log(`Failed to Load ${key} from Local Storage; Loading Default`);
        resolve(defaultResponse);
      }
    }
  });
};

export const set = (key, data = {}) => {
  return new Promise(resolve => {
    if (hasChromeStorage) {
      chrome.storage.sync.set({ [key]: JSON.stringify(data) }, () => {
        // eslint-disable-next-line
        console.log(`Saving ${key} to Chrome Storage`);
        resolve(data);
      });
    } else {
      // eslint-disable-next-line
      console.log(`Saving ${key} to Local Storage`);
      localStorage.setItem(key, JSON.stringify(data));
      resolve(data);
    }
  });
};
