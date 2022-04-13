import {getPhotos} from './main.js';
import {shuffleArray, debounce} from './util.js';
import {renderPhotos, removePictures} from './creating-pictures.js';

const PHOTOS_SET_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersButton = imgFiltersForm.querySelectorAll('.img-filters__button');


const openImgFilters = () => imgFilters.classList.remove('img-filters--inactive');


const createFilters = {
  'filter-default': () => getPhotos().slice(),
  'filter-random': () => shuffleArray(getPhotos().slice()).slice(0, PHOTOS_SET_COUNT),
  'filter-discussed': () => {
    const discussedPhotos = getPhotos().slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length);
    return discussedPhotos;
  },
};


const onButtonClick = debounce((evt) => {
  const selected = imgFiltersForm.querySelector('.img-filters__button--active');

  if(selected) {
    selected.classList.remove('img-filters__button--active');
  }

  evt.target.classList.add('img-filters__button--active');

  removePictures();

  renderPhotos(createFilters[evt.target.id]());
});


imgFiltersButton.forEach((button) => {
  button.addEventListener('click', onButtonClick);
});

export {openImgFilters};
