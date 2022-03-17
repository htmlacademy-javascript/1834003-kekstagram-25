import {openModalBody, closeModalBody} from './big-picture.js';
import {isEscapeKey} from './util.js';

const form = document.querySelector('#upload-select-image');

new Pristine(form);

const imgFile = form.querySelector('#upload-file');
const imgEditor = form.querySelector('.img-upload__overlay');
const closeButton = imgEditor.querySelector('#upload-cancel');
const textAreaComment = imgEditor.querySelector('.text__description');

const textAreaCommentEsc = (evt) => {
  if (textAreaComment.checked ) {
    evt.stopPropagation();
  }
};

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
  textAreaCommentEsc();
};

imgFile.addEventListener('change', () => {
  imgEditor.classList.remove('hidden');
  openModalBody();
  closeButton.addEventListener('click', onCloseEditorForm);
  document.addEventListener('keydown', onEditorFormEscKeydown);
});
