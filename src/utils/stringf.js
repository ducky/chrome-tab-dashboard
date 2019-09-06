const strf = (str = '', format = {}) => {
  if (!Object.keys(format).length) return str;

  return Object.keys(format).reduce((string, key) => {
    const regex = new RegExp(`{${key}}`, 'gi');
    return string.replace(regex, format[key]);
  }, str);
};

export default strf;
