export const ktof = kelvin => {
  const celsius = kelvin - 273;
  return Math.floor(celsius * (9 / 5) + 32);
};
