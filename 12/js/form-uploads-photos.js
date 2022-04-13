const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imgForm = document.querySelector('.img-upload__form');
const imgFile = imgForm.querySelector('#upload-file');
const preview = imgForm.querySelector('.img-upload__preview > img');

const effectsList = imgForm.querySelector('.effects__list');
const effectsPreview = effectsList.querySelectorAll('.effects__preview');


const getImgUploadFile = () => {
  const file = imgFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    preview.src = URL.createObjectURL(file);

    effectsPreview.forEach((evt) => {
      evt.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
};

export {getImgUploadFile};
