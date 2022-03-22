import {openModalBody, closeModalBody} from './big-picture.js';
import {isEscapeKey} from './util.js';

const MAX_HASHTAGS = 5;

const form = document.querySelector('#upload-select-image');

const pristine = new Pristine(form);

const imgFile = form.querySelector('#upload-file');
const imgEditor = form.querySelector('.img-upload__overlay');
const closeButton = imgEditor.querySelector('#upload-cancel');
const textHashtags = imgEditor.querySelector('.text__hashtags');

const closeEditorForm = () => {
  imgEditor.classList.add('hidden');
  closeModalBody();
  form.reset();
  closeButton.removeEventListener('click', onCloseEditorForm);
  document.removeEventListener('keydown', onEditorFormEscKeydown);
};

const onCloseEditorForm = () => closeEditorForm();

const onEditorFormEscKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== textHashtags && !evt.target.classList.contains('text__description')) {
    closeEditorForm();
  }
};

imgFile.addEventListener('change', () => {
  imgEditor.classList.remove('hidden');

  openModalBody();

  closeButton.addEventListener('click', onCloseEditorForm);
  document.addEventListener('keydown', onEditorFormEscKeydown);
});

const onHashTagsInput = () => {

  const re = /^#[a-zа-яё0-9]{1,19}$/i;
  const parts = textHashtags.value.trim().toLowerCase().split(/\s+/);

  if (parts.length === 0) {
    return;
  }

  const isValid = parts.every((hashtag) => re.test(hashtag));
  console.log(parts, isValid);
  if (!isValid) {
    //ошибка
    console.log('не валиден');
  }

  for (let i = 0; i < parts.length; i++) {
    for (let j = i+1; j < parts.length; j++) {
      if (parts[i] === parts[j])
      //ошибка
      console.log('одинаковый хэш-тег');
    }
  }

  if (parts.length > MAX_HASHTAGS) {
    //ошибка
    console.log ('Больше 5 хеш-тегов');
  }
};

textHashtags.addEventListener('input', onHashTagsInput);

//pristine.addValidator(textHashtags, isValid, 'Хэш-тег не соответствует правилам.');

/*form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});*/
