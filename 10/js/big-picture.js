import {closeOnModalEscKeydown, getDeclinationNumber} from './util.js';

const COMMENTS_STEP = 5;

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const hideBlockCommentCount = bigPicture.querySelector('.social__comment-count');
const hideBlockCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPicturePhoto = bigPicture.querySelector('.big-picture__img > img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const containerComments = bigPicture.querySelector('.social__comments');
const templateComment = containerComments.querySelector('.social__comment');
const socialFooterText = bigPicture.querySelector('.social__footer-text');


let totalComments = COMMENTS_STEP;
let arrayCommets = [];


const appendComments = () => {

  containerComments.innerHTML = '';

  totalComments = (totalComments > arrayCommets.length) ? arrayCommets.length : totalComments;

  const comments = arrayCommets.slice(0, totalComments);

  if (arrayCommets.length <= COMMENTS_STEP || totalComments >= arrayCommets.length) {
    hideBlockCommentsLoader.classList.add('hidden');
  } else {
    hideBlockCommentsLoader.classList.remove('hidden');
  }

  const descriptionsDeclinationNumber = getDeclinationNumber(arrayCommets.length, 'комментария', 'комментариев', 'комментариев');
  hideBlockCommentCount.textContent = `${totalComments} из ${arrayCommets.length} ${descriptionsDeclinationNumber}`;

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
  arrayCommets = [];
  socialFooterText.value = '';
};


const onModalEscKeydown = (evt) => {

  closeOnModalEscKeydown(evt, () => {

    closeBigPicture();

    hideBlockCommentsLoader.removeEventListener('click', onCommentsButtonLoader);

    document.removeEventListener('keydown', onModalEscKeydown);
  });

};


const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onModalEscKeydown);
  closeButton.removeEventListener('click', onCloseBigPictureClick);

  hideBlockCommentsLoader.removeEventListener('click', onCommentsButtonLoader);
};


const openModalBody = () => body.classList.add('modal-open');


const showBigPicture = (photo) => {
  bigPicturePhoto.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureCaption.textContent = photo.description;

  arrayCommets = photo.comments;

  appendComments();

  bigPicture.classList.remove('hidden');
  openModalBody();

  hideBlockCommentsLoader.addEventListener('click', onCommentsButtonLoader);

  closeButton.addEventListener('click', onCloseBigPictureClick);
  document.addEventListener('keydown', onModalEscKeydown);
};

export {showBigPicture, openModalBody, closeModalBody};
