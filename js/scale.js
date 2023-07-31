const SCALE_STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const PERCENT_DIVIDER = 100;

const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview img');

let scaleNumber;

// Получаем число из строки
const getScaleImage = (scaleString) => parseInt(scaleString.value, 10);

// Уменьшение изображения
const onMinusButtonClick = () => {
  scaleNumber = getScaleImage(scaleControl);
  if (scaleNumber > MIN_VALUE) {
    scaleControl.value = `${scaleNumber - SCALE_STEP}%`;
    uploadPreview.style.transform = `scale(${(scaleNumber - SCALE_STEP) / PERCENT_DIVIDER})`;
  }
};

// Увеличение изображения
const onPlusButtonClick = () => {
  scaleNumber = getScaleImage(scaleControl);
  if (scaleNumber < MAX_VALUE) {
    scaleControl.value = `${scaleNumber + SCALE_STEP}%`;
    uploadPreview.style.transform = `scale(${(scaleNumber + SCALE_STEP) / 100})`;
  }
};
//const resetScale = () => scaleImage(MIN_VALUE);

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

const resetScale = () => getScaleImage(scaleControl.value);

const changeScaleffect = () => {
  uploadPreview.style.transform = '';

};

export {resetScale, changeScaleffect};
