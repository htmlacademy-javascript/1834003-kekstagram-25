import {showAlert} from './util.js';
import {request} from './fetch.js';
import {renderPhotos} from './creating-pictures.js';
import {openImgFilters, onEffectsFiltersClick} from './filters.js';
import './form.js';

const PHOTO_COUNT = 25;

const imgFiltersForm = document.querySelector('img-filters__form');


const onError = () => {
  showAlert('Нет доступа к серверу. Попробуйте еще раз.');
};

let userPhotos = [];

const onSuccess = (data) => {
  userPhotos = data.slice();

  openImgFilters();


  renderPhotos(userPhotos.slice(0, PHOTO_COUNT));

  imgFiltersForm.addEventListener('click', onEffectsFiltersClick);
};

request(onSuccess, onError, 'GET');
