const ALERT_SHOW_TIME = 5000;

// Показываем ошибку
function showAlert (message) {
  const alert = document.createElement('div');
  alert.style.top = '50%';
  alert.style.left = '50%';
  alert.style.position = 'fix';
  //alert.style.zIndex = '100';
  //alert.style.top = '0';
  //alert.style.align = 'center';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '24px';
  alert.style.style = 'bold';
  alert.style.textAlign = 'center';
  alert.style.color = 'red';
  alert.style.background = 'yellow';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomNumberFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      previousValues.length = 0;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const pressEscButton = (evt) => evt.key === 'Escape';
// Проверка, является ли нажатая кнопка Esc


export {getRandomInteger, createRandomNumberFromRangeGenerator, getRandomArrayElement, pressEscButton, showAlert};
