import { createPhotoDescriptions } from '/js/data.js';
import { renderThumbnails } from '/js/thumbnail.js';
let photo = renderThumbnails(createPhotoDescriptions());
import {pressEscButton} from '/js/util.js';

//popup
const popUp = document.querySelector('.big-picture');
const miniPicture = document.querySelectorAll('.picture');
const escButton = document.querySelector('.big-picture__cancel');

//содержимое popup
const bigPictureImage = document.querySelector('.big-picture__img');
const bigPicturesLikes = document.querySelector('.likes-count');

miniPicture.forEach((photo) => { // открываем фото
  photo.addEventListener ('click', ()  => {
    popUp.classList.remove('hidden');
  });
});

escButton.addEventListener('click', () => { // закрываем фото по клику
  popUp.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => { // закрываем фото по Esc
  if (pressEscButton(evt)) {
    evt.preventDefault();
    popUp.classList.add('hidden');
  }

});
