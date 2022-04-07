import {showBigPicture} from './big-picture.js';
import {request} from './fetch.js';

const PHOTO_COUNT = 25;

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

const onError = () => {
  alert('Нет доступа к серверу.');
};

let userPhotos = [];

const onSuccess = (data) => {
  userPhotos = data.slice();
  const photos = userPhotos.slice(0, PHOTO_COUNT);
  renderPhotos(photos);
};

//const SetPhotos = userPhotos.slice(0, PHOTO_COUNT);

request(onSuccess, onError, 'GET');

//export {renderPhotos};
