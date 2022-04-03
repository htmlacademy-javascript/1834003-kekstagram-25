import {openModalBody, closeModalBody} from './big-picture.js';
import {closeOnModalEscKeydown} from './util.js';
import {textHashtags, form} from './form-hashtags.js';

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
    return `grayscale(${parseInt(effectLevelValue.value, BASE) * Options.RATIO})`;
  },

  sepia: () => {
    effectsLevel.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectLevelValue.value, BASE) * Options.RATIO})`;
  },

  marvin: () => {
    effectsLevel.classList.remove('visually-hidden');
    return `invert(${Math.floor(effectLevelValue.value)}%)`;
  },

  phobos: () => {
    effectsLevel.classList.remove('visually-hidden');
    return `blur(${(parseInt(effectLevelValue.value, BASE) * Options.BLUR_MAX_SCALE) * Options.RATIO}px)`;
  },

  heat: () => {
    effectsLevel.classList.remove('visually-hidden');
    return `brightness(${(parseInt(effectLevelValue.value, BASE) * Options.BRIGHTNESS_MAX_SCALE) * Options.RATIO})`;
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
});

