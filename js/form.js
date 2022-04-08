import {request} from './fetch.js';
import {openModalBody, closeModalBody} from './big-picture.js';
import {closeOnModalEscKeydown} from './util.js';
import {textHashtags, pristine} from './form-hashtags.js';

const BASE = 10;

const Options = {
  RATIO: 0.01,
  BLUR_MAX_SCALE: 3,
  BRIGHTNESS_MAX_SCALE: 3,
};

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const Slider = {
  MIN: 0,
  MAX: 100,
  START: 100,
  STEP: 1,
};

const body = document.querySelector('body');

const form = body.querySelector('#upload-select-image');
const imgFile = form.querySelector('#upload-file');
const imgEditor = form.querySelector('.img-upload__overlay');
const closeButton = imgEditor.querySelector('#upload-cancel');

const scaleValue = imgEditor.querySelector('.scale__control--value');
const вuttonMinus = imgEditor.querySelector('.scale__control--smaller');
const вuttonPlus = imgEditor.querySelector('.scale__control--bigger');
const imgPreview = imgEditor.querySelector('.img-upload__preview');

const effectsList = form.querySelector('.effects__list');
const preview = imgPreview.querySelector('img');

const effectsLevel = form.querySelector('.img-upload__effect-level');
const sliderElement = effectsLevel.querySelector('.effect-level__slider');
const effectLevelValue = effectsLevel.querySelector('.effect-level__value');

const templateSuccess = body.querySelector('#success').content.querySelector('.success');
//const containerSuccess = body.querySelector('.success');
//const successButton = containerSuccess.querySelector('.success__button');
const templateError = body.querySelector('#error').content.querySelector('.error');
//const containerError = body.querySelector('.error');
//const errorButton = containerError.querySelector('.error__button');


let currentEffect = '';


const closeEditorForm = () => {
  imgEditor.classList.add('hidden');
  closeModalBody();

  imgPreview.style.transform = '';

  preview.style.filter = 'none';

  form.reset();
};


const onEditorFormEscKeydown = (evt) => {

  closeOnModalEscKeydown(evt, () => {

    if (evt.target !== textHashtags && !evt.target.classList.contains('text__description')) {
      closeEditorForm();
      document.removeEventListener('keydown', onEditorFormEscKeydown);
    }

  });

};


const onCloseEditorForm = () => {
  closeEditorForm();

  closeButton.removeEventListener('click', onCloseEditorForm);
  document.removeEventListener('keydown', onEditorFormEscKeydown);
};


imgFile.addEventListener('change', () => {
  imgEditor.classList.remove('hidden');
  openModalBody();

  effectsLevel.classList.add('visually-hidden');

  scaleValue.value = `${Zoom.MAX}%`;

  closeButton.addEventListener('click', onCloseEditorForm);
  document.addEventListener('keydown', onEditorFormEscKeydown);
});


const changeZoom = (step) => {
  let newZoom = parseInt(scaleValue.value, BASE)+ step;

  if (step < 0 && newZoom < Zoom.MIN) {
    newZoom = Zoom.MIN;
  }

  if (step > 0 && newZoom > Zoom.MAX) {
    newZoom = Zoom.MAX;
  }

  imgPreview.style.transform = `scale(${newZoom / 100})`;

  scaleValue.value = `${newZoom}%`;
};


const onButtonMinus = () => {
  changeZoom(-1 * Zoom.STEP);
};


const onButtonPlus = () => {
  changeZoom(Zoom.STEP);
};

вuttonMinus.addEventListener('click', onButtonMinus);
вuttonPlus.addEventListener('click', onButtonPlus);

const effects = {

  none: () => {
    effectsLevel.classList.add('visually-hidden');
    return '';
  },

  chrome: () => {
    effectsLevel.classList.remove('visually-hidden');
    return `grayscale(${(parseInt(effectLevelValue.value, BASE) * Options.RATIO).toFixed(1)})`;  // 6 * 0.01 = 0.1
  },

  sepia: () => {
    effectsLevel.classList.remove('visually-hidden');
    return `sepia(${(parseInt(effectLevelValue.value, BASE) * Options.RATIO).toFixed(1)})`;
  },

  marvin: () => {
    effectsLevel.classList.remove('visually-hidden');
    return `invert(${Math.floor(effectLevelValue.value).toFixed(0)}%)`;
  },

  phobos: () => {
    effectsLevel.classList.remove('visually-hidden');
    return `blur(${((parseInt(effectLevelValue.value, BASE) * Options.BLUR_MAX_SCALE) * Options.RATIO).toFixed(1)}px)`;
  },

  heat: () => {
    effectsLevel.classList.remove('visually-hidden');
    return `brightness(${((parseInt(effectLevelValue.value < 10 ? 1 + effectLevelValue.value : effectLevelValue.value, BASE) * Options.BRIGHTNESS_MAX_SCALE) * Options.RATIO).toFixed(1)})`;
    //return `brightness(${(parseInt(effectLevelValue.value < 100 ? effectLevelValue.value++ : effectLevelValue.value, BASE) * Options.BRIGHTNESS_MAX_SCALE) * Options.RATIO})`;
  },

};


const onEffectsListClick = (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    if (currentEffect) {
      preview.classList.remove(currentEffect);
    }

    effectLevelValue.value = Slider.START;
    sliderElement.noUiSlider.set(Slider.START);

    currentEffect = target.classList[1];
    preview.classList.add(target.classList[1]);

    preview.style.filter = effects[currentEffect.replace('effects__preview--', '')]();

  }

};

effectsList.addEventListener('click', onEffectsListClick);

noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.START,
  step: Slider.STEP,
  connect: 'lower',
});

sliderElement.noUiSlider.on('change', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  preview.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
  console.log(preview.style.filter);
});


const forRequestMessageForm = (template, container) => {
  const similarListFragment = document.createDocumentFragment();
  const fragmentElement = template.cloneNode(true);

  similarListFragment.appendChild(fragmentElement);
  container.appendChild(similarListFragment);

  fragmentElement.style.zIndex = 100;

  fragmentElement.querySelector('button').addEventListener('click', (evt) => {
    evt.preventDefault();
    fragmentElement.remove();
  });

  const onRequestMessageEscKeydown = (evt) => closeOnModalEscKeydown(evt, () =>fragmentElement.remove());
  document.addEventListener('keydown', onRequestMessageEscKeydown);
};


const onError = () => {
  forRequestMessageForm(templateError, body);
  // клонирование сообщения

};


const onSuccess = () => {
  // очистить форму сбросить фильтры вернуть зум закрыть форму
  closeEditorForm();

  // клонирование сообщения
  forRequestMessageForm(templateSuccess, body);
};


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    request(onSuccess, onError, 'POST', new FormData(evt.target));
  }
});
