const sliderElement = document.querySelector('.effect-level__slider');
//const effectsList = document.querySelectorAll('.effects__list');
//const radioButtons = document.querySelectorAll('.effects__radio');
//const imgPreview = document.querySelector('.img-upload__preview').children;


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0.1,
});


/*const toggleEffects = () => {

  radioButtons.every((radioButton) => {
    const effect = radioButton.value;

    if (effect === 'none') {
      imgPreview.classList.add('effects__preview--none');
    }

    if (effect === 'chrome') {
      imgPreview.classList.add('effects__preview--chrome');
    }

    if (effect === 'sepia') {
      imgPreview.classList.add('effects__preview--sepia');
    }

    if (effect === 'marvin') {
      imgPreview.classList.add('effects__preview--marvin');
    }

    if (effect === 'phobos') {
      imgPreview.classList.add('effects__preview--phobos');
    }

    if (effect === 'heat') {
      imgPreview.classList.add('ffects__preview--heat');
    }

  });

};


effectsList.addEventListener('click', toggleEffects);*/
