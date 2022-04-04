const BUTTON_KEYBOARD = 'Escape';

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === BUTTON_KEYBOARD;

const closeOnModalEscKeydown = (evt, cb) => {
  if (isEscapeKey(evt)) {
    cb();
  }
};

const getDeclinationNumber = (number, nominative, genitiveSingular, genitivePlural) => {

  if (number > 10 && (Math.round((number % 100) / 10)) === 1) {
    return genitivePlural;
  } else {
    switch(number % 10) {
      case 1: return nominative;
      case 2:
      case 3:
      case 4: return genitiveSingular;
    }
    return genitivePlural;
  }

};

export {getRandomInteger, getRandomArrayElement, closeOnModalEscKeydown, getDeclinationNumber};
