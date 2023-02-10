const handleInfoCharectersLength = (str) => {
  if (str?.length >= 15) return str?.slice(0, 12).concat('...');
  return str;
};

export default handleInfoCharectersLength;