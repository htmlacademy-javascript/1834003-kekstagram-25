const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getStringCheck = (stringCheck, maxLength) => stringCheck.length <= maxLength;

getStringCheck('', 140);

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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  avatar: `img/avatar-${  [getRandomInteger(1, 6)]  }.svg`,
  message: getRandomArrayElement(MESSAGES_USERS),
  name: getRandomArrayElement(NAMES_USERS),
  id: Math.floor(Math.random()),
});

const comments = Array.from({length: 2}, createComment);

//console.log(comments);

let numberId = 0;
let photosDescriptions = [''];

const createPhotoDescription = () => {
  for (let i = 0; i < photosDescriptions.length; i++) {
    numberId ++;
    return {
      id: numberId,
      url:`photos/${  numberId  }.jpg`,
      description: 'Фотография в стиле KEKSOGRAM',
      likes: getRandomInteger(15, 200),
      comments: comments,
    };
  }
};

photosDescriptions = Array.from({length: 25}, createPhotoDescription);
//console.log(photosDescriptions);
