const getShortcutName = (str) => {
  const words = str?.split(' ');
  const shortenName = `${words[0]} ${words[1]}`;
  const matches = shortenName?.match(/\b(\w)/g);
  // get first characters of each word of the name and show on avatar
  // example: Super Admin ==> SA
  return matches?.join('').toUpperCase();
};

export default getShortcutName;