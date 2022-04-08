import {showAlert} from './util.js';
import {request} from './fetch.js';
import {renderPhotos} from './creating-pictures.js';
import './form.js';


const PHOTO_COUNT = 25;

const onError = () => {
  showAlert('Нет доступа к серверу. Попробуте еще раз.');
};

let userPhotos = [];

const onSuccess = (data) => {
  userPhotos = data.slice();

  renderPhotos(userPhotos.slice(0, PHOTO_COUNT));
};

request(onSuccess, onError, 'GET');
