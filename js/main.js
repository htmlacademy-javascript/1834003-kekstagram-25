const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInteger(0, 50);

const getStringCheck = (stringCheck, maxLength) => stringCheck.length <= maxLength;

getStringCheck('', 140);
