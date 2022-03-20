import {openModalBody, closeModalBody} from './big-picture.js';
import {isEscapeKey} from './util.js';

const form = document.querySelector('#upload-select-image');

const pristine = new Pristine(form);

const imgFile = form.querySelector('#upload-file');
const imgEditor = form.querySelector('.img-upload__overlay');
const closeButton = imgEditor.querySelector('#upload-cancel');
//const textAreaComment = imgEditor.querySelector('.text__description');

/*const textAreaCommentEsc = (evt) => {
  if (textAreaComment.onfocus) {
    evt.stopPropagation();
  }
};*/

const closeEditorForm = () => {
  imgEditor.classList.add('hidden');
  closeModalBody();
  form.reset();

  //document.removeEventListener('keydown', onEditorFormEscKeydown);
};

const onCloseEditorForm = () => closeEditorForm();

const onEditorFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeEditorForm();
  }
};

imgFile.addEventListener('change', () => {
  imgEditor.classList.remove('hidden');
  openModalBody();
  closeButton.addEventListener('click', onCloseEditorForm);
  document.addEventListener('keydown', onEditorFormEscKeydown);
});

const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

/*function validateNickname (value) {
  return value.length >= 2 && value.length <= 50;
}*/
const hashtagsText = form.querySelector('.text__hashtags').value;

const hashtagsGroup = hashtagsText.split(',', 5);

//хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
//хэш-теги разделяются пробелами;
//один и тот же хэш-тег не может быть использован дважды;

const validateHashtags =() => hashtagsGroup.forEach((hashtag) => hashtag === re.test('JavaScript') && hashtagsGroup.length <= 5);

//const hashtagsGroup = () => re.test('JavaScript') && hashtagsGroup.length <= 5;

pristine.addValidator(hashtagsText, validateHashtags, 'Хэш-тег не соответствует правилам.');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

/*const isValid = pristine.validate();
if (isValid) {
  console.log('Можно отправлять');
} else {
  console.log('Форма невалидна');
}*/
