import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const hideBlockCommentCount = bigPicture.querySelector('.social__comment-count');
const hideBlockCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPicturePhoto = bigPicture.querySelector('.big-picture__img > img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const closeModalBody = () => body.classList.remove('modal-open');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  closeModalBody();

  closeButton.removeEventListener('click', onCloseBigPictureClick);
  document.removeEventListener('keydown', onModalEscKeydown);
};

const onCloseBigPictureClick = () => closeBigPicture();

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

const containerComments = bigPicture.querySelector('.social__comments');
const templateComment = containerComments.querySelector('.social__comment');

const similarListFragment = document.createDocumentFragment();

const renderComment = (comment) => {
  const commentElement = templateComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

const renderComments = (comments) => {
  containerComments.innerHTML = '';

  comments.forEach((comment) => {
    similarListFragment.appendChild(renderComment(comment));
  });

  containerComments.appendChild(similarListFragment);
};

const openModalBody = () => body.classList.add('modal-open');

const showBigPicture = (photo) => {
  bigPicturePhoto.src = photo.url;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureLikes.textContent = photo.likes;
  bigPictureCaption.textContent = photo.description;

  renderComments(photo.comments);

  bigPicture.classList.remove('hidden');
  hideBlockCommentCount.classList.add('hidden');
  hideBlockCommentsLoader.classList.add('hidden');
  openModalBody();
  closeButton.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onModalEscKeydown);
};

export {showBigPicture, openModalBody, closeModalBody};
