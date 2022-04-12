import {showAlert} from './util.js';
import {request} from './fetch.js';
import {renderPhotos} from './creating-pictures.js';
import {openImgFilters} from './filters.js';
import './form.js';

const PHOTO_COUNT = 25;


const onError = () => {
  showAlert('Нет доступа к серверу. Попробуйте еще раз.');
};

let userPhotos = [];
const getPhotos = () => userPhotos;

const onSuccess = (data) => {
  userPhotos = data.slice();

  openImgFilters();

  renderPhotos(getPhotos().slice(0, PHOTO_COUNT));
};

request(onSuccess, onError, 'GET');

export {getPhotos};
