/* eslint-disable no-restricted-syntax */
const hookConvertObjectToQueryString = (data: Object) => {
  const list: string[] = [];

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (element) {
        list.push(`${key}=${element}`);
      }
    }
  }
  return list.join('&');
};
export default hookConvertObjectToQueryString;
