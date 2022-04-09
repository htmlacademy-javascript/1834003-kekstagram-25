const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

const body = document.querySelector('body');

const form = body.querySelector('#upload-select-image');

const textHashtags = form.querySelector('.text__hashtags');
const button = form.querySelector('#upload-submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});


let errorMessage = '';
const error = () => errorMessage;

const hashtagsHandler = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хеш-тег не может состоять только из одной решетки',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хеш-тег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хеш-теги разделяюся пробелом',
    },
    {
      check: inputArray.some((item, index, array) => array.includes(item, index + 1)),
      error: 'Хеш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина одного хеш-тега ${MAX_SYMBOLS} символов, включая знак "#"`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хеш-тег содержит недопустимые символы',
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хеш-тегов`,
    },
  ];

  return rules.every((rule) => {

    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }

    return !isInvalid;
  });

};


pristine.addValidator(textHashtags, hashtagsHandler, error);


const onHashTagInput = () => {
  button.disabled = !pristine.validate();
};

textHashtags.addEventListener('input', onHashTagInput);

export {textHashtags, pristine};
