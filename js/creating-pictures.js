import {showBigPicture} from './big-picture.js';

const containerPictures = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
  const pictureElement = templatePicture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(photo);
  });

  return pictureElement;
};

const renderPhotos = (photos) => {

  photos.forEach((photo) => {
    similarListFragment.appendChild(renderPhoto(photo));
  });

  containerPictures.appendChild(similarListFragment);
};

const removePictures = () => {
  const photos = containerPictures.querySelectorAll('.picture');
  if (photos) {
    photos.forEach((photo) => photo.remove());
  }
};

export {renderPhotos, removePictures};
