import './creating-pictures.js';
import {isEscapeKey} from './util.js';

const buttonModalWindow = document.querySelectorAll('.picture');
const openWindow = document.querySelector('.big-picture');
const hideBlockCommentCount = openWindow.querySelector('.social__comment-count');
const hideBlockCommentsLoader = openWindow.querySelector('.comments-loader');
const modalOpen = document.querySelector('body');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    openWindow.classList.add('hidden');
    modalOpen.classList.remove('modal-open');
  }
};

const openModalWindow = () => {
  for (const buttonModalWindowElement of buttonModalWindow) {
    buttonModalWindowElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openWindow.classList.remove('hidden');
      hideBlockCommentCount.classList.add('hidden');
      hideBlockCommentsLoader.classList.add('hidden');
      modalOpen.classList.add('modal-open');
      document.addEventListener('keydown', onModalEscKeydown);
    });
  }
};

const cancelBlockCommentsLoader = openWindow.querySelector('.big-picture__cancel');

const closeModalWindow = () => cancelBlockCommentsLoader.addEventListener('click', () => {
  openWindow.classList.add('hidden');
  modalOpen.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
});

openModalWindow();
closeModalWindow();
