import {openModalBody, closeModalBody} from './big-picture.js';
import {closeOnModalEscKeydown} from './util.js';
import {textHashtags, form} from './form-hashtags.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const imgFile = form.querySelector('#upload-file');
const imgEditor = form.querySelector('.img-upload__overlay');
const closeButton = imgEditor.querySelector('#upload-cancel');


const closeEditorForm = () => {
  imgEditor.classList.add('hidden');
  closeModalBody();

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


const scaleValue = imgEditor.querySelector('.scale__control--value');
const вuttonMinus = imgEditor.querySelector('.scale__control--smaller');
const вuttonPlus = imgEditor.querySelector('.scale__control--bigger');
const imgPreview = imgEditor.querySelector('.img-upload__preview');

const percentNumber = Zoom.MAX;


let step = 0;
let ratioScale = 1;


const disabledButtonMaxZoom = () => {

  if (scaleValue.value  === `${Zoom.MAX}%`) {
    вuttonPlus.disabled = true;
  } else {
    вuttonPlus.disabled = false;
  }

};


imgFile.addEventListener('change', () => {
  imgEditor.classList.remove('hidden');
  openModalBody();

  disabledButtonMaxZoom();

  closeButton.addEventListener('click', onCloseEditorForm);
  document.addEventListener('keydown', onEditorFormEscKeydown);
});


const onButtonMinus = () => {

  step -= Zoom.STEP;
  scaleValue.value = `${percentNumber + step}%`;

  ratioScale = (percentNumber + step) / 100;
  imgPreview.style.transform = `scale(${ratioScale})`;

  вuttonPlus.disabled = false;

  if (`${percentNumber + step}%` === `${Zoom.MIN}%`) {
    вuttonMinus.disabled = true;
  } else {
    вuttonMinus.disabled = false;
  }

};


const onButtonPlus = () => {

  step += Zoom.STEP;
  scaleValue.value = `${percentNumber + step}%`;

  ratioScale = (percentNumber + step) / 100;
  imgPreview.style.transform = `scale(${ratioScale})`;

  вuttonMinus.disabled = false;

  if (`${percentNumber + step}%` === `${Zoom.MAX}%`) {
    вuttonPlus.disabled = true;
  } else {
    вuttonPlus.disabled = false;
  }

};

вuttonMinus.addEventListener('click', onButtonMinus);
вuttonPlus.addEventListener('click', onButtonPlus);
