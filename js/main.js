const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  const numberValue = (Math.random() * (max - min + 1)) + min;
  return Math.floor(numberValue);
};

getRandomInteger(0, 50);

const getStringCheck = (stringCheck, maxLength) => {
  const stringLength = stringCheck.length;
  if (stringLength <= maxLength) {
    return true;
  }
  return false;
};

getStringCheck('', 140);
