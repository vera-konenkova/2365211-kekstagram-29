const ALERT_SHOW_TIME = 5000;
const FILTER_SHOW_PHOTO = 10;

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


// Генерация массива из FILTER_SHOW_PHOTO (10) неповторяющихся чисел
const generateArrayUniqueNumbers = (a, b) => {
  const numbers = [];
  while (numbers.length < FILTER_SHOW_PHOTO) {
    const randomNumber = getRandomInteger(a, b);
    let found = false;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] === randomNumber){
        found = true;
        break;
      }
    }
    if (!found) {
      numbers[numbers.length] = randomNumber;
    }
  }
  return numbers;
};


// Генерируем 10 неповторяющихся чисел от 0 до 24, т.к. в данном случае массив с сервера содержит только 25 постов
const randomNumbers = generateArrayUniqueNumbers(0, 24);
const createRandomPosts = (array) => {
  const randomPosts = [];
  for (let i = 0; i < randomNumbers.length; i++) {
    const posts = array.find((post) => randomNumbers[i] === post.id);
    randomPosts.push(posts);
  }
  return randomPosts;
};

// «устранение дребезга»
function debounce (callback, timeoutDelay) {
  let isCooldown = false;
  return function() {
    if (isCooldown) {
      return;
    }
    callback.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
    }, timeoutDelay);
  };
}

function getRandomNumber (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      //const error ='Перебраны все числа из диапазона от ' + min + ' до ' + max;
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const pressEscButton = (evt) => evt.key === 'Escape';
// Проверка, является ли нажатая кнопка Esc

export {getRandomInteger, getRandomNumber, getRandomArrayElement, pressEscButton, debounce, showAlert, createRandomPosts};
