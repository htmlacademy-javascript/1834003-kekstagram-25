const BUTTON_KEYBOARD = 'Escape';
const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {closeOnModalEscKeydown, getDeclinationNumber, showAlert};
