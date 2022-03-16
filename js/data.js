import {getRandomInteger, getRandomArrayElement} from './util.js';

const PHOTO_COUNT = 25;

const MESSAGES_USERS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES_USERS = [
  'Петя',
  'Коля',
  'Оля',
  'Семён',
  'Валя',
  'Настя',
];

const createComment = () => ({
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(MESSAGES_USERS),
  name: getRandomArrayElement(NAMES_USERS),
  id: Math.random().toFixed(3) * 1000,
});


let numberId = 0;
let photos = [];

const createPhotoDescription = () => {
  numberId++;
  return {
    id: numberId,
    url:`photos/${ numberId }.jpg`,
    description: 'Фотография в стиле KEKSOGRAM',
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 5)}, createComment),
  };
};

photos = () => Array.from({length: PHOTO_COUNT}, createPhotoDescription);

export {photos};
