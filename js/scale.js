const SCALE_STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const PERCENT_DIVIDER = 100;

const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const uploadPreview = document.querySelector('.img-upload__preview');

const scaleImage = (value) => {
  uploadPreview.style.transform = `scale(${value / PERCENT_DIVIDER})`;
  scaleControl.value = `${value}`;
};

const onMinusButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleControl.value,10) - SCALE_STEP, MIN_VALUE)
  );
};

const onPlusButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleControl.value,10) + SCALE_STEP, MAX_VALUE)
  );
};

//const resetScale = () => scaleImage(MIN_VALUE);

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

const resetScale = () => scaleImage(scaleControl.value);

export {resetScale};
