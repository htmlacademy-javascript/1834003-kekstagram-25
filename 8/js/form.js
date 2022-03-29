import {openModalBody, closeModalBody} from './big-picture.js';
import {closeOnModalEscKeydown} from './util.js';
import {textHashtags, form} from './form-hashtags.js';

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


imgFile.addEventListener('change', () => {
  imgEditor.classList.remove('hidden');
  openModalBody();

  closeButton.addEventListener('click', onCloseEditorForm);
  document.addEventListener('keydown', onEditorFormEscKeydown);
});


//Создаём зум

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const scaleValue = imgEditor.querySelector('.scale__control--value');
const вuttonMinus = imgEditor.querySelector('.scale__control--smaller');
const вuttonPlus = imgEditor.querySelector('.scale__control--bigger');

const percentNumber = Zoom.MAX;
scaleValue.value = `${percentNumber} %`;

вuttonMinus.addEventListener('click', () => {
  const newValue = percentNumber - Zoom.STEP;

  if (newValue > Zoom.MIN) {
    scaleValue.value = newValue;
  }
});

вuttonPlus.addEventListener('click', () => {
  const newValue = +scaleValue.value + Zoom.STEP;

  if (newValue >= Zoom.MIN && newValue <= 75) {
    scaleValue.value = newValue;
  }

});
