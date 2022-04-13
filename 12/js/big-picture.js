import {closeOnModalEscKeydown, getDeclinationNumber} from './util.js';

const COMMENTS_STEP = 5;

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const blockCommentCount = bigPicture.querySelector('.social__comment-count');
const blockCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPicturePhoto = bigPicture.querySelector('.big-picture__img > img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const buttonModalPicture = bigPicture.querySelector('.big-picture__cancel');
const containerComments = bigPicture.querySelector('.social__comments');
const templateComment = containerComments.querySelector('.social__comment');
const socialFooterText = bigPicture.querySelector('.social__footer-text');


let totalComments = COMMENTS_STEP;
let arrayComments = [];


const appendComments = () => {

  containerComments.innerHTML = '';

  totalComments = (totalComments > arrayComments.length) ? arrayComments.length : totalComments;

  const comments = arrayComments.slice(0, totalComments);

  if (arrayComments.length <= COMMENTS_STEP || totalComments >= arrayComments.length) {
    blockCommentsLoader.classList.add('hidden');
  } else {
    blockCommentsLoader.classList.remove('hidden');
  }

  const descriptionsDeclinationNumber = getDeclinationNumber(arrayComments.length, 'комментария', 'комментариев', 'комментариев');
  blockCommentCount.textContent = `${totalComments} из ${arrayComments.length} ${descriptionsDeclinationNumber}`;

  const similarListFragment = document.createDocumentFragment();


  const renderComment = (comment) => {
    const commentElement = templateComment.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };


  comments.forEach((comment) => {
    similarListFragment.appendChild(renderComment(comment));
  });

  containerComments.appendChild(similarListFragment);
};


const onCommentsButtonLoader = () => {
  totalComments += COMMENTS_STEP;
  appendComments();
};


const closeModalBody = () => body.classList.remove('modal-open');


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  closeModalBody();

  totalComments = COMMENTS_STEP;
  arrayComments = [];
  socialFooterText.value = '';
};


const onModalEscKeydown = (evt) => {

  closeOnModalEscKeydown(evt, () => {

    closeBigPicture();

    blockCommentsLoader.removeEventListener('click', onCommentsButtonLoader);

    document.removeEventListener('keydown', onModalEscKeydown);
  });
};


const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onModalEscKeydown);
  buttonModalPicture.removeEventListener('click', onCloseBigPictureClick);

  blockCommentsLoader.removeEventListener('click', onCommentsButtonLoader);
};


const openModalBody = () => body.classList.add('modal-open');


const showBigPicture = (photo) => {
  bigPicturePhoto.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureCaption.textContent = photo.description;

  arrayComments = photo.comments;

  appendComments();

  bigPicture.classList.remove('hidden');
  openModalBody();

  blockCommentsLoader.addEventListener('click', onCommentsButtonLoader);

  buttonModalPicture.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onModalEscKeydown);
};

export {showBigPicture, openModalBody, closeModalBody};
