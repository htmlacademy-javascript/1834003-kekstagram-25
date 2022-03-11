import {photosDescriptions} from './data.js';

const containerPictures = document.querySelector('.pictures');
const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const usersPhotosDescriptions = photosDescriptions();

const similarListFragment = document.createDocumentFragment();

const createUsersPhotosDescriptions = () => usersPhotosDescriptions.forEach(({url, comments, likes}) => {
  const pictureElement = templatePicture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  similarListFragment.appendChild(pictureElement);
});

createUsersPhotosDescriptions();

containerPictures.appendChild(similarListFragment);
