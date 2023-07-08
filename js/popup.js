import {renderThumbnails} from '/js/thumbnail.js';
import {showBigPicture} from '/js/full-picture.js';
import {createPhotoDescriptions} from '/js/data.js';

renderThumbnails (createPhotoDescriptions);

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
    showBigPicture (picture);
  });
  renderThubnails (pictures);
};


export {findPicture};
