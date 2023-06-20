// JavaScript Document// JavaScript Documentconst
const quantityFoto = 25;
const likes = {
  MIN: 15,
  MAX: 200
};
const quantityMessages = {
  MIN1: 0,
  MAX2: 30
};
const numbersComments = {
  MIN: 0,
  MAX: 30
};

//генерирование числа в итервале от min до max
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

//генерирование неповторяющихся чисел в интервале от min до max
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const description = ["Неожиданный ракурс", "Прекрасный свет", "Хорошее решение", "Хорошее настроение", "Мир прекрасен!"];
const author = ["Карлсон", "Том Сойер", "Старик Хоттабыч", "Змей горынч", "Алёнушка", "Илья Муромец", "Баба Яга"];

const message ="Всё отлично! В целом всё неплохо./Когда вы делаете фотографию, хорошо бы убирать палец из кадра./В конце концов это просто непрофессионально.Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше./Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше./Лица у людей на фотке перекошены, как будто их избивают./Как можно было поймать такой неудачный момент?!";

//создаем из текста массив предложений
const sentences = message.split('/');
// Выбираем 1-2 предложения из текста
var putComments = sentences[getRandomInt(0, sentences.length-1)];
console.log(putComments);
//id, число — идентификатор опубликованной фотографии.
//Это число от 1 до 25. Идентификаторы не должны повторяться

//массив случайных неповторящихся чисел от 1 до quantityFoto
var arr = [];
var id = Math.floor(Math.random() * (25 - 1 + 1)) + 1;


//информационный массив
let photos = [];
let idPhoto = getRandomInt(0, quantityFoto.MAX);
let idNumber = getRandomInt(0, 500);
let authorName = author[getRandomInt(0, author.length-1)];
 const appendFoto = (idPhoto) => ({
id: idNumber,
url: `photos/${idPhoto}.jpg`,
description: description[getRandomInt(0, description.length-1)],
likes: getRandomInt(likes.MIN, likes.MAX),
comments: putComments,
author: authorName,
});

const appendFotos = () => {

	for (let i=1;i<=quantityFoto; i++){
	photos.push(appendFoto(i))
	}
};
appendFotos();

photos
