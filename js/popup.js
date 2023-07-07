import {pressEscButton} from '/js/util.js';
import {showFullPicture} from '/js/full-picture.js;'
import {renderThumbnails} from '/js/thumbnail.js';
import { createPhotoDescriptions } from '/js/data.js';
renderThumbnails(createPhotoDescriptions());
// поиск картинки
const container = document.querySelector('.pictures');
const findPicture = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
    return;
    }
    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
      showBigPicture(picture);
  });
  renderThubnails(pictures);
};


//popup
const popUp = document.querySelector('.big-picture');
const miniPicture = document.querySelectorAll('.picture');
const escButton = document.querySelector('.big-picture__cancel');


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

export {miniPicture};
