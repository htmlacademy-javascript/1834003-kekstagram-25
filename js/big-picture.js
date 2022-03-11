const buttonModalWindow = document.querySelectorAll('.picture');
const openWindow = document.querySelector('.big-picture');
const hideBlockCommentCount = openWindow.querySelector('.social__comment-count');
const hideBlockCommentsLoader = openWindow.querySelector('.comments-loader');
const modalOpen = document.querySelector('body');

const openModalWindow = () => {
  for (const buttonModalWindowElement of buttonModalWindow) {
    buttonModalWindowElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openWindow.classList.remove('hidden');
      hideBlockCommentCount.classList.add('hidden');
      hideBlockCommentsLoader.classList.add('hidden');
      modalOpen.classList.add('modal-open');
    });
  }
};

const cancelBlockCommentsLoader = openWindow.querySelector('.big-picture__cancel');

const closeModalWindow = () => cancelBlockCommentsLoader.addEventListener('click', () => {
  openWindow.classList.add('hidden');
  modalOpen.classList.remove('modal-open');
});

const escapeModalWindow = () => document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    openWindow.classList.add('hidden');
    modalOpen.classList.remove('modal-open');
  }
});

openModalWindow();
closeModalWindow();
escapeModalWindow();
