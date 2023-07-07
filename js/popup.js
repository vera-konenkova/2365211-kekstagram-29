import { createPhotoDescriptions } from '/js/data.js';
import { renderThumbnails } from '/js/thumbnail.js';
import {pressEscButton} from '/js/util.js';
import {showFullPicture} from '/js/full-picture.js;'
renderThumbnails(createPhotoDescriptions());

// поиск картинки
const container = document.querySelector('.pictures');
const findPicture = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
    return;
    }
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );

  });
  return picture;
};


//popup
const popUp = document.querySelector('.big-picture');
const miniPicture = document.querySelectorAll('.picture');
const escButton = document.querySelector('.big-picture__cancel');

popup = ()=> {
miniPicture.forEach((photo) => { // открываем фото
  photo.addEventListener ('click', ()  => {
  popUp.classList.remove('hidden');
  const foundPhoto = findPicture(photo);
  showFullPicture(foundPhoto);
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
};
export {popup}
