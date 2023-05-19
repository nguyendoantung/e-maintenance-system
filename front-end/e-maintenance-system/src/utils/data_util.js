export const randomNumber = (min, max) => Math.random() * (max - min) + min;

export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const pagination = (page, pageSize, data) => {
  const start = (page - 1) * pageSize;
  const dataPerPage = data.slice(start, start + pageSize);
  const total = data.length;
  const pages = Math.ceil(total / pageSize);

  return {
    pages,
    total,
    data: dataPerPage,
  };
};

export const deleteEmptyPropertyFromObj = (obj) =>
  Object.keys(obj).forEach((key) => !obj[key] && delete obj[key]); // eslint-disable-line no-param-reassign

export const randomString = (len) => {
  const listChar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const lenListChar = listChar.length;
  const crypto = window.crypto || window.msCrypto;
  const array = new Uint8Array(1);
  let result = "";
  for (let i = 0; i < len; i += 1) {
    crypto.getRandomValues(array);
    const randomNum = "".concat(array[0].toString());
    result += listChar.charAt(randomNum % lenListChar);
  }

  return result;
};
