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

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  //document.removeEventListener('keydown', onModalEscKeydown);
};

const onCloseBigPictureClick = () => closeBigPicture();

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

const showBigPicture = (photo) => {
  bigPicturePhoto.src = photo.url;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureLikes.textContent = photo.likes;
  bigPictureCaption.textContent = photo.description;
  bigPicture.classList.remove('hidden');
  hideBlockCommentCount.classList.add('hidden');
  hideBlockCommentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onModalEscKeydown);
};

/*const containerComments = bigPicture.querySelector('.social__comments');
const templateComment = bigPicture.querySelector('.social__comments').content.querySelector('.social__comment');

const similarListFragment = document.createDocumentFragment();

const renderComment = (comment) => {
  const commentElement = templateComment.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

const renderComments = (photo) => {
  (photo.comments).forEach((comment) => {
    similarListFragment.appendChild(renderComment(comment));
  });

  containerComments.appendChild(similarListFragment);
};*/

export {showBigPicture};
