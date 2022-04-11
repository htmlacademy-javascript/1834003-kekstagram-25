const imgFilters = document.querySelector('.img-filters');
//const imgFiltersForm = imgFilters.querySelector('img-filters__form');
//const imgBatton = imgFiltersForm.querySelector('#img-filters__button');img-filters__button
//const battonDefault = imgFiltersForm.querySelector('#filter-default');
//const battonRandom = imgFiltersForm.querySelector('#filter-random');
//const battonDiscussed = imgFiltersForm.querySelector('#filter-discussed');

const PHOTOS_SET_SUM = 10;

const openImgFilters = () => imgFilters.classList.remove('img-filters--inactive');

/*const filters = {
  default: () => {
    imgBatton.classList.add('img-filters__button--active');
    return '';
  }

  random: () => {
    imgBatton.classList.remove('img-filters__button--active');
    return
  },

  discussed: () => {
    imgBatton.classList.remove('img-filters__button--active');
    return
  },
};*/


/*const compareComments = (commentA, commentB) => {

  return commentB - commentA;
};*/

const getRandomPhotosSet = (userPhotos) => {
  for (let i = userPhotos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [userPhotos[i], userPhotos[j]] = [userPhotos[j], userPhotos[i]];
  }
  return userPhotos.slice(0, PHOTOS_SET_SUM);

};


const onEffectsFiltersClick = (evt) => {

  if(evt.target.classList.contains('#filter-random')) {
    getRandomPhotosSet();
  }
};


//imgFiltersForm.addEventListener('click', onEffectsFiltersClick); Перенёс в MAIN


export {openImgFilters, onEffectsFiltersClick};
